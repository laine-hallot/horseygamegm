import React from 'react';

import { GENE_LOC } from '../../data';
import { type GeneData } from '../../types.ts';
import { catClass } from '../../utils.ts';
import { GeneRow } from './gene-row';
import styles from './gene-list.module.css';

export const GeneList: React.FC<{
  entries: [string, GeneData][];
  selected: string | null;
  onSelect: (name: string) => void;
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
