import React from 'react';

import { BASES } from '../../data';
import { type GeneLocation } from '../../types.ts';
import { type GeneData } from '../../types.ts';
import { BaseChip } from '../../components/base-chip.tsx';
import { valColor } from '../../utils.ts';
import { SwapCard } from './sway-card';
import styles from './crisper-planner.module.css';

export const EditGuide: React.FC<{
  name: string;
  gene: GeneData;
  location?: GeneLocation;
}> = ({ name, gene, location }) => {
  const maxVal = Math.max(...gene.alleleValues);
  const minVal = Math.min(...gene.alleleValues);
  return (
    <div className="card">
      <div className={styles.editGuideTitle}>EDIT GUIDE — {name}</div>
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
      <div className={styles.swapGrid}>
        {BASES.map((base, index) => (
          <SwapCard
            key={base}
            base={base}
            index={index}
            value={gene.alleleValues[index]}
            isMax={gene.alleleValues[index] === maxVal}
            isMinNeg={
              gene.alleleValues[index] === minVal &&
              gene.alleleValues[index] < 0
            }
          />
        ))}
      </div>
      <div className={styles.hintBar}>
        Quick ref at H{location ? location.helixNumber : '?'} P
        {location ? location.position : '?'}:{' '}
        {BASES.map((base, index) => (
          <React.Fragment key={base}>
            <BaseChip b={base} size="sm" /> ={' '}
            <span
              className={styles.hintVal}
              style={{ color: valColor(gene.alleleValues[index]) }}
            >
              {gene.alleleValues[index]}
            </span>
            {index < BASES.length - 1 && <>&nbsp;&nbsp;</>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
