import React from 'react';
import styles from './gene-list.module.css';
import type { GeneLocation } from '../../types';

export const GeneRow: React.FC<{
  name: string;
  cat: string;
  catClass: string;
  location?: GeneLocation;
  selected: boolean;
  onClick: () => void;
}> = ({ name, cat, catClass, location, selected, onClick }) => (
  <div
    className={`${styles.geneRow}${selected ? ` ${styles.selected}` : ''}`}
    onClick={onClick}
  >
    <div>
      <span className={styles.gname}>{name}</span>
      <span className={`${styles.gcat} ${catClass}`}>{cat}</span>
    </div>
    {location && (
      <span className={styles.gloc}>
        H{location.helixNumber}·P{location.position}
      </span>
    )}
  </div>
);
