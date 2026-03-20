import React from 'react';

import { BaseChip } from '../../components/base-chip.tsx';
import { BASE_LABEL } from '../../data';
import { valColor } from '../../utils.ts';

import styles from './crisper-planner.module.css';

export const SwapCard: React.FC<{
  base: string;
  index: number;
  value: number;
  isMax: boolean;
  isMinNeg: boolean;
}> = ({ base, index, value, isMax, isMinNeg }) => (
  <div
    className={`${styles.swapCard}${isMax ? ` ${styles.isMax}` : ''}${isMinNeg ? ` ${styles.isMinNeg}` : ''}`}
  >
    <BaseChip b={base} size="lg" />
    <div className={styles.sl}>{BASE_LABEL[base]}</div>
    <div className={styles.sl}>g{index}</div>
    <div className={styles.sv} style={{ color: valColor(value) }}>
      {value}
    </div>
    {isMax && <div className={`${styles.badge} ${styles.badgeMax}`}>MAX</div>}
    {isMinNeg && (
      <div className={`${styles.badge} ${styles.badgeMin}`}>MIN</div>
    )}
  </div>
);
