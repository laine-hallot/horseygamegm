import type {
  GeneLocation,
  GeneData,
  GeneNames,
} from '@laine-hallot/horsey-parser';

import React from 'react';

import { BASES, BASE_LABEL } from '@laine-hallot/horsey-parser';

import { BaseChip } from '../../components/base-chip.tsx';
import { valColor, catClass } from '../../utils.ts';

import styles from './gene-detail.module.css';

export const GeneDetail: React.FC<{
  name: GeneNames;
  gene: GeneData;
  location?: GeneLocation;
}> = ({ name, gene, location }) => {
  const maxVal = Math.max(...gene.alleleValues);
  const maxBase = BASES[gene.alleleValues.indexOf(maxVal)];
  if (maxBase === undefined) {
    return null;
  }
  return (
    <div className="card">
      <div className={styles.geneDetailHeader}>
        <span className={styles.geneDetailName}>{name}</span>
        <span className={`${styles.geneDetailMeta} ${catClass(gene.category)}`}>
          {gene.category}
        </span>
        <span className={styles.geneDetailMeta}>
          baseline {gene.maxValue} · scale {gene.scale}
        </span>
      </div>

      {location ? (
        <div className={styles.locBar}>
          <span className={styles.geneDetailMeta}>Location:</span>
          <span className={styles.lval}>Helix {location.helixNumber}</span>
          <span className={styles.locBarSeparator}>·</span>
          <span className={`${styles.lval} ${styles.lvalSm}`}>
            Position {location.position}
          </span>
          <span className={styles.locBarSeparator}>·</span>
          <span className={styles.locBarStrands}>same on both strands</span>
        </div>
      ) : (
        <div className={`${styles.locBar} ${styles.locBarUnconfirmed}`}>
          Location unconfirmed (SIZE gene)
        </div>
      )}

      <div className={styles.alleleGrid}>
        {BASES.map((base, index) => (
          <div
            key={base}
            className={styles.alleleCard}
            style={{ borderColor: `var(--${base})44` }}
          >
            <BaseChip b={base} size="md" />
            <div
              className={`${styles.av} ${styles.alleleValue}`}
              style={{ color: valColor(gene.alleleValues[index]) }}
            >
              {gene.alleleValues[index]}
            </div>
            <div className={styles.al}>
              {BASE_LABEL[base]} · g{index}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.hintBar}>
        To maximize this gene: use{' '}
        <b style={{ color: `var(--${maxBase})` }}>
          {maxBase} ({BASE_LABEL[maxBase]})
        </b>{' '}
        at Helix {location ? location.helixNumber : '?'}, Position{' '}
        {location ? location.position : '?'} on both strands.
      </div>

      <div className={styles.crisprInfo}>
        In-game: go to{' '}
        <b className={styles.editGuideAccent}>
          Helix {location ? location.helixNumber : '?'}
        </b>
        , count to{' '}
        <b className={styles.editGuideAccent}>
          position {location ? location.position : '?'}
        </b>{' '}
        from the top (position 0 = top). The base there controls this gene. Same
        position on both strands.
      </div>
    </div>
  );
};
