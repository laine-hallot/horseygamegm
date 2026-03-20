import React from 'react';

import { BaseChip } from '../../components/base-chip.tsx';
import { GENES, BASE_IDX } from '../../data';
import { valColor, catClass, catBorderClass } from '../../utils.ts';

import styles from './gene-result.module.css';

export const GeneResult: React.FC<{
  name: string;
  position: number;
  base1?: string;
  base2?: string;
}> = ({ name, position, base1, base2 }) => {
  const gene = GENES[name];
  const strand1Value =
    base1 && gene ? gene.alleleValues[BASE_IDX[base1]] : null;
  const strand2Value =
    base2 && gene ? gene.alleleValues[BASE_IDX[base2]] : null;
  return (
    <div
      className={`${styles.resultGene}${gene ? ` ${catBorderClass(gene.category)}` : ''}`}
    >
      <div className={styles.rpos}>P{position}</div>
      <div
        className={`${styles.rname}${gene ? ` ${catClass(gene.category)}` : ''}`}
      >
        {name}
      </div>
      <div className={styles.rval}>
        {base1 ? (
          <>
            <BaseChip b={base1} size="sm" />
            <span className={styles.valEq}>=</span>
            <span
              className={`${styles.alleleValue}`}
              style={{ color: valColor(strand1Value) }}
            >
              {strand1Value}
            </span>
          </>
        ) : (
          <span className={styles.valMissing}>—</span>
        )}
        {base2 && base2 !== base1 && (
          <>
            <span className={styles.strand2Label}>S2:</span>
            <BaseChip b={base2} size="sm" />
            <span className={styles.valEq}>=</span>
            <span
              className={styles.alleleValue}
              style={{ color: valColor(strand2Value) }}
            >
              {strand2Value}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
