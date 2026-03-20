import type {
  GeneData,
  GeneLocation,
  GeneNames,
} from '@laine-hallot/horsey-parser';

import React from 'react';

import { BASES } from '@laine-hallot/horsey-parser';

import { BaseChip } from '../../components/base-chip.tsx';
import { valColor } from '../../utils.ts';
import { SwapCard } from './sway-card';

import styles from './crisper-planner.module.css';

export const EditGuide: React.FC<{
  name: GeneNames;
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
        {BASES.map((base, index) => {
          const alleleValue = gene.alleleValues[index];
          if (alleleValue === undefined) {
            return null;
          }
          return (
            <SwapCard
              key={base}
              base={base}
              index={index}
              value={alleleValue}
              isMax={alleleValue === maxVal}
              isMinNeg={alleleValue === minVal && alleleValue < 0}
            />
          );
        })}
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
