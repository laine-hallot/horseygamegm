import type { GeneNames } from '@horseygamegm/horsey-parser';

import React from 'react';
import { useNavigate } from 'react-router';

import { HELIX_MAP, GENES } from '@horseygamegm/horsey-parser';

import { catClass, catBorderClass } from '../../utils.ts';

import styles from './helix-map.module.css';

const GeneTile: React.FC<{
  name: GeneNames;
  position: number;
  onClick?: () => void;
}> = ({ name, position, onClick }) => {
  const gene = GENES[name];
  return (
    <div
      className={`${styles.geneTile}${gene ? ` ${catBorderClass(gene.category)}` : ''}`}
      onClick={onClick}
    >
      <div className={styles.pos}>P{position}</div>
      <div
        className={`${styles.name}${gene ? ` ${catClass(gene.category)}` : ''}`}
      >
        {name}
      </div>
      {gene && <div className={styles.cat}>{gene.category}</div>}
    </div>
  );
};

const HelixBlock: React.FC<{
  helixIndex: number;
  genes: GeneNames[];
}> = ({ helixIndex, genes }) => {
  const navigator = useNavigate();
  const onSelectGene = (name: GeneNames) => {
    navigator(`/genes?name=${name}`);
  };
  return (
    <div className={styles.helixBlock}>
      <div className={styles.helixLabel}>
        HELIX {helixIndex}
        <span>{genes.length} positions</span>
      </div>
      <div className={styles.geneTiles}>
        {genes.map((name, position) => (
          <GeneTile
            key={position}
            name={name}
            position={position}
            onClick={() => onSelectGene?.(name)}
          />
        ))}
      </div>
    </div>
  );
};

export const MapTab: React.FC<{}> = () => (
  <div>
    <div className="card info">
      Each helix position maps to exactly one gene. The base (A/T/C/G) at that
      position selects the allele value. Both strands are read independently.
      Click any gene tile to view it in Gene Lookup.
    </div>
    {HELIX_MAP.map((genes, helixIndex) => (
      <HelixBlock key={helixIndex} helixIndex={helixIndex} genes={genes} />
    ))}
  </div>
);
