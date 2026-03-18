import React from 'react';
import { BaseChip } from '../../components/base-chip';
import { GeneResult } from './gene-result';
import styles from './helix-result.module.css';

export const HelixResult: React.FC<{
  helixIndex: number;
  genes: string[];
  strand1: string;
  strand2: string;
}> = ({ helixIndex, genes, strand1, strand2 }) => {
  const hasData = strand1 || strand2;
  return (
    <div className={styles.resultHelix}>
      <div
        className={`${styles.helixResultHeader}${hasData ? ` ${styles.hasData}` : ''}`}
      >
        <span className={styles.helixLabelText}>HELIX {helixIndex}</span>
        {strand1 && (
          <div className={styles.strandRow}>
            <span className={styles.strandLabel}>S1</span>
            {strand1.split('').map((base, index) => (
              <BaseChip key={index} b={base} size="sm" />
            ))}
          </div>
        )}
        {strand2 && strand2 !== strand1 && (
          <div className={styles.strandRow}>
            <span className={styles.strandLabel}>S2</span>
            {strand2.split('').map((base, index) => (
              <BaseChip key={index} b={base} size="sm" />
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
              base1={strand1?.[position]?.toUpperCase()}
              base2={strand2?.[position]?.toUpperCase()}
            />
          ))}
        </div>
      )}
    </div>
  );
};
