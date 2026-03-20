import type {
  ParsedBase,
  ParsedHelix,
  GeneNames,
} from '@horseygamegm/horsey-parser';

import React, { useCallback } from 'react';

import { BaseChip } from '../../components/base-chip';
import { GeneResult } from './gene-result';

import styles from './helix-result.module.css';

export const HelixResult: React.FC<{
  genomeIndex: number;
  genes: GeneNames[];
  strand1: ParsedHelix | undefined;
  strand2: ParsedHelix | undefined;
  onChangeGene: (
    gene: ParsedBase,
    genomeIndex: number,
    helixIndex: number,
    basePosition: number,
  ) => void;
}> = ({ genomeIndex, genes, strand1, strand2, onChangeGene }) => {
  const handleGeneChange = useCallback(
    (gene: ParsedBase, helixIndex: number, basePosition: number) => {
      onChangeGene(gene, genomeIndex, helixIndex, basePosition);
    },
    [genomeIndex, onChangeGene],
  );

  const hasData = strand1 || strand2;
  return (
    <div className={styles.resultHelix}>
      <div
        className={`${styles.helixResultHeader}${hasData ? ` ${styles.hasData}` : ''}`}
      >
        <span className={styles.helixLabelText}>HELIX {genomeIndex}</span>
        {strand1 && (
          <div className={styles.strandRow}>
            <span className={styles.strandLabel}>S1</span>
            {strand1.data.bases.data.map((base, index) => (
              <BaseChip key={index} b={base.data.base} size="sm" />
            ))}
          </div>
        )}
        {strand2 && strand2 !== strand1 && (
          <div className={styles.strandRow}>
            <span className={styles.strandLabel}>S2</span>
            {strand2.data.bases.data.map((base, index) => (
              <BaseChip key={index} b={base.data.base} size="sm" />
            ))}
          </div>
        )}
        {strand2 && strand2 === strand1 && (
          <span className={styles.strandEq}>S2 = S1</span>
        )}
        {!hasData && <span className={styles.noData}>no data</span>}
      </div>
      {hasData && (
        <div className={styles.resultGenes}>
          {genes.map((name, position) => (
            <GeneResult
              key={position}
              name={name}
              position={position}
              base1={strand1?.data.bases.data[position]}
              base2={strand2?.data.bases.data[position]}
              onChangeGene={handleGeneChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
