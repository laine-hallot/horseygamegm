import type {
  GeneData,
  GeneLocation,
  GeneNames,
} from '@horseygamegm/horsey-parser';

import React from 'react';

import { catClass } from '../../utils.ts';

import styles from './gene-info-card.module.css';

export const GeneInfoCard: React.FC<{
  name: GeneNames;
  gene: GeneData;
  location?: GeneLocation;
}> = ({ name, gene, location }) => (
  <div className={`card ${styles.geneInfoCard}`}>
    <div className={styles.geneInfoName}>{name}</div>
    <div className={styles.geneInfoBody}>
      Category: <span className={catClass(gene.category)}>{gene.category}</span>
      <br />
      Helix:{' '}
      <b className={styles.geneInfoHighlight}>
        {location ? location.helixNumber : '?'}
      </b>
      <br />
      Position:{' '}
      <b className={styles.geneInfoHighlight}>
        {location ? location.position : '?'}
      </b>
      <br />
      Baseline: {gene.maxValue} · Scale: {gene.scale}
    </div>
  </div>
);
