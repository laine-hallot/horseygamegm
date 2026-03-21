import type {
  ParsedBase,
  ParsedBaseSequence,
  ParsedDoubleHelix,
  ParsedGenome,
  ParsedHelix,
  Result,
} from './types';

import { HELIX_MAP, type GeneNames } from './data';
import { formatHelixId } from './format';
import { Ok } from './types';

export const parseBaseChain = (
  helixGenes: GeneNames[],
  data: string,
  row: number,
  column: number,
  cursor: number,
): Result<ParsedBaseSequence> => {
  const rawChars = data.split('');

  const rowData: ParsedBase[] = [];
  for (const [index, gene] of helixGenes.entries()) {
    const char = rawChars[index];
    if (char === 'A' || char === 'T' || char === 'C' || char === 'G') {
      rowData.push({
        name: 'base',
        column: column + index,
        row,
        index: cursor + index,
        data: { base: char, gene },
      });
    } else {
      return {
        ok: false,
        error: { message: `Unknown char "${char}" at ${row}:${index}` },
      };
    }
  }
  return Ok({
    name: 'base-sequence',
    data: rowData,
    column,
    row,
    index: cursor,
  });
};

export const parseHelix = (
  line: string,
  lineIndex: number,
  parentCursor: number,
): Result<{
  lineData: ParsedHelix;
  helixId: number;
  textLength: number;
}> => {
  let textLength = 0;
  if (/[0-9]{2}:/.test(line)) {
    const helixId = parseInt(line.slice(0, 3));
    if (!Number.isNaN(helixId)) {
      textLength = textLength + 3; // consume helix label length
      const helixGenes = HELIX_MAP[helixId];
      if (helixGenes === undefined) {
        return {
          ok: false,
          error: {
            message: `Helix ID ${formatHelixId(helixId)} outside of known helix ID range ${formatHelixId(0)}-${formatHelixId(HELIX_MAP.length)}`,
          },
        };
      }
      const lineData = parseBaseChain(
        helixGenes,
        line.slice(3),
        lineIndex,
        3,
        parentCursor + textLength,
      );
      if (lineData.ok === true) {
        textLength += lineData.value.data.length; // consume line data length
        const parsedHelix: ParsedHelix = {
          name: 'helix',
          column: 0,
          row: lineIndex,
          index: parentCursor,
          data: {
            id: helixId,
            bases: lineData.value,
          },
        };
        return Ok({
          lineData: parsedHelix,
          helixId,
          textLength,
        });
      } else {
        return lineData;
      }
    }
    return {
      ok: false,
      error: {
        message: `Invalid helix ID number for line ${lineIndex}`,
      },
    };
  }
  return {
    ok: false,
    error: {
      message: `Helix prefix for line: ${lineIndex} is incorrectly formatted (correct format is "XX:")`,
    },
  };
};

export const parseDoubleHelix = (
  lineOne: string,
  lineTwo: string | undefined,
  lineIndex: number,
  parentCursor: number,
): Result<{ doubleHelix: ParsedDoubleHelix; textLength: number }> => {
  let cursor = parentCursor;
  const startLineOne = cursor;

  const dataLineOne = parseHelix(lineOne, lineIndex, cursor);

  if (!dataLineOne.ok) {
    return dataLineOne;
  }
  cursor = cursor + dataLineOne.value.textLength + 1; // consume helix data length + 1 for \n

  if (lineTwo === undefined) {
    return {
      ok: false,
      error: {
        message: `Genome ends before a line pair could be found for helix ID: ${formatHelixId(dataLineOne.value.helixId)} `,
      },
    };
  }

  const dataLineTwo = parseHelix(lineTwo, lineIndex + 1, cursor);
  if (!dataLineTwo.ok) {
    return dataLineTwo;
  }
  cursor = cursor + dataLineTwo.value.textLength + 1; // consume helix data length + 1 for \n
  if (dataLineTwo.value.helixId !== dataLineOne.value.helixId) {
    return {
      ok: false,
      error: {
        message: `Helix ID(${dataLineTwo.value.helixId}) for line ${lineIndex + 1} does not match helix ID(${dataLineOne.value.helixId}) on line ${lineIndex}`,
      },
    };
  }

  return Ok({
    doubleHelix: {
      name: 'double-helix',
      data: [dataLineOne.value.lineData, dataLineTwo.value.lineData],
      column: 0,
      row: lineIndex,
      index: startLineOne,
    },
    textLength: cursor - startLineOne,
  });
};

export const parseGenome = (genome: string): Result<ParsedGenome> => {
  let cursor = 0;
  const helices: ParsedDoubleHelix[] = [];

  const rawLines = genome.split('\n');
  let lineIndex = 0;

  while (lineIndex < rawLines.length) {
    const line = rawLines[lineIndex];

    if (lineIndex === rawLines.length - 1 && line === '') {
      // last line is empty ignore it
      lineIndex = lineIndex + 1;
      continue;
    }

    if (line === undefined) {
      /*we could check that both lines in the double helix are defined but
      we can return a better error message if we deffer that check till 
      after we parse the first helix in the pair */
      return { ok: false, error: { message: `Parser overran gnome length` } };
    }

    const rawLineTwo = rawLines[lineIndex + 1];

    const doubleHelix = parseDoubleHelix(line, rawLineTwo, lineIndex, cursor);
    lineIndex = lineIndex + 2;
    if (!doubleHelix.ok) {
      return doubleHelix;
    }
    cursor = cursor + doubleHelix.value.textLength;
    helices.push(doubleHelix.value.doubleHelix);
  }
  return Ok({
    name: 'root',
    data: helices,
    index: 0,
  });
};
