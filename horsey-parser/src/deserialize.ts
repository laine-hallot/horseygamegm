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

export const baseChainParser = (
  helixGenes: GeneNames[],
  data: string,
  row: number,
  cursor: number,
): Result<ParsedBaseSequence> => {
  const rawChars = data.split('');

  const rowData: ParsedBase[] = [];
  for (const [index, gene] of helixGenes.entries()) {
    const char = rawChars[index];
    if (char === 'A' || char === 'T' || char === 'C' || char === 'G') {
      rowData.push({
        name: 'base',
        column: 3 + index,
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
    column: 3,
    row,
    index: cursor,
  });
};
export const parseGenome = (genome: string): Result<ParsedGenome> => {
  const parseLine = (
    line: string,
    lineIndex: number,
    parentCursor: number,
  ): Result<{
    lineData: ParsedHelix;
    helixId: number;
    lineCursor: number;
  }> => {
    let lineCursor = 0;
    if (/[0-9]{2}:/.test(line)) {
      const helixId = parseInt(line.slice(0, 3));
      if (!Number.isNaN(helixId)) {
        lineCursor = lineCursor + 3; // consume helix label length
        const helixGenes = HELIX_MAP[helixId];
        if (helixGenes === undefined) {
          return {
            ok: false,
            error: {
              message: `Helix ID ${formatHelixId(helixId)} outside of known helix ID range ${formatHelixId(0)}-${formatHelixId(HELIX_MAP.length)}`,
            },
          };
        }
        const lineData = baseChainParser(
          helixGenes,
          line.slice(3),
          lineIndex,
          parentCursor + lineCursor,
        );
        if (lineData.ok === true) {
          lineCursor += lineData.value.data.length; // consume line data length
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
            lineCursor,
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

  let cursor = 0;
  const helices: ParsedDoubleHelix[] = [];

  const rawLines = genome.split('\n');
  let lineIndex = 0;

  while (lineIndex < rawLines.length) {
    const line = rawLines[lineIndex];
    if (line === undefined) {
      return { ok: false, error: { message: `Parser overran gnome length` } };
    }
    const dataLineOne = parseLine(line, lineIndex, cursor);
    if (dataLineOne.ok) {
      const startLineOne = cursor;
      cursor = cursor + dataLineOne.value.lineCursor + 1; // consume helix data length + 1 for \n

      const rawLineTwo = rawLines[lineIndex + 1];
      if (rawLineTwo === undefined) {
        return {
          ok: false,
          error: {
            message: `Genome ends before a line pair could be found for helix ID: ${formatHelixId(dataLineOne.value.helixId)}`,
          },
        };
      }
      const dataLineTwo = parseLine(rawLineTwo, lineIndex + 1, cursor);
      if (dataLineTwo.ok) {
        cursor = cursor + dataLineTwo.value.lineCursor + 1; // consume helix data length + 1 for \n
        if (dataLineTwo.value.helixId !== dataLineOne.value.helixId) {
          return {
            ok: false,
            error: {
              message: `Helix ID(${dataLineTwo.value.helixId}) for line ${lineIndex + 1} does not match helix ID(${dataLineOne.value.helixId}) on line ${lineIndex}`,
            },
          };
        }
        helices.push({
          data: [dataLineOne.value.lineData, dataLineTwo.value.lineData],
          column: 0,
          row: lineIndex,
          index: startLineOne,
          name: 'double-helix',
        });
        lineIndex = lineIndex + 2;
      } else {
        return dataLineTwo;
      }
    } else {
      return dataLineOne;
    }
  }
  return Ok({
    name: 'root',
    data: helices,
    index: 0,
  });
};
