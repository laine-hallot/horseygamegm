import type {
  ParsedBase,
  ParsedGenome,
  ParsedHelix,
  Result,
} from '@laine-hallot/horsey-parser';

import { useCallback, useState } from 'react';

import { Deserialize } from '@laine-hallot/horsey-parser';

export const useGenome = () => {
  const [text, setText] = useState('');
  const [genome, setGenome] = useState<Result<ParsedGenome>>();

  const analyzeGenome = () => {
    const result = Deserialize.parseGenome(text);
    setGenome(result);
  };

  const modifyGene = useCallback(
    (
      gene: ParsedBase,
      genomeIndex: number,
      helixIndex: number,
      basePosition: number,
    ) => {
      setGenome((genomeResult) => {
        if (genomeResult !== undefined && genomeResult.ok) {
          const genome = genomeResult.value;
          const genomeData = genome.data;
          const doubleHelix = genomeData[genomeIndex];
          const targetHelix = doubleHelix?.data[helixIndex];
          const targetBaseSequence = targetHelix?.data.bases;
          if (
            targetHelix === undefined ||
            doubleHelix === undefined ||
            targetBaseSequence === undefined
          ) {
            return genomeResult;
          }

          const updatedHelix: ParsedHelix = {
            ...targetHelix,
            data: {
              ...targetHelix.data,
              bases: {
                ...targetBaseSequence,
                data: targetBaseSequence.data.with(basePosition, gene),
              },
            },
          };
          const updatedDoubleHelixData: [ParsedHelix, ParsedHelix] =
            helixIndex > 0
              ? [doubleHelix.data[0]!, updatedHelix]
              : [updatedHelix, doubleHelix.data[1]!];

          return {
            ...genomeResult,
            value: {
              ...genome,
              data: genome.data.with(genomeIndex, {
                ...doubleHelix!,
                data: updatedDoubleHelixData,
              }),
            },
          } as Result<ParsedGenome>;
        }
        return genomeResult;
      });
      setText((text) =>
        text
          .slice(0, gene.index)
          .concat(gene.data.base, text.slice(gene.index + 1)),
      );
    },
    [],
  );

  const handleClear = useCallback(() => {
    setText('');
    setGenome(undefined);
  }, []);

  return {
    text,
    setText,
    genome,
    analyzeGenome,
    handleClear,
    modifyGene,
  };
};
