import type { GeneData, GeneNames } from '@horseygamegm/horsey-parser';

import React from 'react';

import { GENE_LOC } from '@horseygamegm/horsey-parser';

import { catClass } from '../../utils.ts';
import { GeneRow } from './gene-row';

import styles from './gene-list.module.css';

export const GeneList: React.FC<{
  entries: [GeneNames, GeneData][];
  selected: GeneNames | null;
  onSelect: (name: GeneNames) => void;
}> = ({ entries, selected, onSelect }) => (
  <div className={styles.geneList}>
    {entries.map(([name, gene]) => (
      <GeneRow
        key={name}
        name={name}
        cat={gene.category}
        catClass={catClass(gene.category)}
        location={GENE_LOC[name]}
        selected={selected === name}
        onClick={() => onSelect(name)}
      />
    ))}
  </div>
);
