import type { GeneLocation, GeneNames } from '@horseygamegm/horsey-parser';

import React from 'react';
import { useNavigate } from 'react-router';

import styles from './gene-list.module.css';

export const GeneRow: React.FC<{
  name: GeneNames;
  cat: string;
  catClass: string;
  location?: GeneLocation;
  selected: boolean;
}> = ({ name, cat, catClass, location, selected }) => {
  const navigator = useNavigate();
  return (
    <div
      className={`${styles.geneRow}${selected ? ` ${styles.selected}` : ''}`}
      onClick={() => {
        navigator(`/genes?name=${name}`);
      }}
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
};
