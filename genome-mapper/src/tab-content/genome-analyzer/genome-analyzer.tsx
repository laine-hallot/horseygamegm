import type { ParsedBase, ParsedGenome } from '@horseygamegm/horsey-parser';

import React from 'react';

import { HELIX_MAP } from '@horseygamegm/horsey-parser';

import { useGenome } from '../../hooks/genome';
import { GenomeInput } from './genome-input';
import { HelixResult } from './helix-result';

import styles from './gnome-analyzer.module.css';

export const AnalyzerTab: React.FC = () => {
  const { text, setText, genome, analyzeGenome, handleClear, modifyGene } =
    useGenome();

  return (
    <div>
      <GenomeInput
        text={text}
        onChange={setText}
        onAnalyze={analyzeGenome}
        onClear={handleClear}
      />
      {genome === undefined ? null : genome.ok ? (
        <GenomeDisplay genome={genome.value} modifyGene={modifyGene} />
      ) : (
        <div className={styles.genomeError}>
          <span>{genome.error.message}</span>
        </div>
      )}
    </div>
  );
};

const GenomeDisplay: React.FC<{
  genome: ParsedGenome;
  modifyGene: (
    gene: ParsedBase,
    genomeIndex: number,
    helixIndex: number,
    basePosition: number,
  ) => void;
}> = ({ genome, modifyGene }) => {
  return (
    <div>
      {HELIX_MAP.map((genes, genomeIndex) => {
        return (
          <HelixResult
            key={genomeIndex}
            genomeIndex={genomeIndex}
            genes={genes}
            strand1={genome.data[genomeIndex]?.data[0]}
            strand2={genome.data[genomeIndex]?.data[1]}
            onChangeGene={modifyGene}
          />
        );
      })}
    </div>
  );
};
