import type { GeneNames } from '@horseygamegm/horsey-parser';

import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { GENES, GENE_LOC, isGeneName } from '@horseygamegm/horsey-parser';

import { EditGuide } from './edit-guide';
import { GeneInfoCard } from './gene-info-card';
import { GeneSelect } from './gene-select';

import styles from './crisper-planner.module.css';

export const CrisprTab: React.FC = () => {
  const [searchParams, _setSearchParams] = useSearchParams();

  const selected = useMemo<GeneNames | undefined>(() => {
    const preselect = searchParams.get('name');
    if (preselect && isGeneName(preselect)) {
      return preselect;
    }
    return undefined;
  }, [searchParams]);

  const gene = selected !== undefined ? GENES[selected] : undefined;
  const location = selected !== undefined ? GENE_LOC[selected] : undefined;

  return (
    <div>
      <div className="card info">
        <strong className={styles.editGuideAccent}>How to use:</strong> Select a
        gene. The tool shows exactly which helix and position to edit, and what
        base to place for each allele value. No genome input needed — position
        is fixed for every horse.
      </div>
      <div className="two-col">
        <div>
          <GeneSelect value={selected} />
          {selected && gene && (
            <GeneInfoCard name={selected} gene={gene} location={location} />
          )}
        </div>
        <div>
          {selected && gene && (
            <EditGuide name={selected} gene={gene} location={location} />
          )}
        </div>
      </div>
    </div>
  );
};
