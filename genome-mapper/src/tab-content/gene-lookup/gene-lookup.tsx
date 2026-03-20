import type { GeneData, GeneNames } from '@horseygamegm/horsey-parser';

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { GENES, GENE_LOC, isGeneName } from '@horseygamegm/horsey-parser';

import { GeneDetail } from './gene-detail';
import { GeneFilters } from './gene-filter';
import { GeneList } from './gene-list';

import styles from './gene-lookup.module.css';

export const GenesTab: React.FC<{}> = () => {
  const [searchParams, _setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');

  const selected = useMemo<GeneNames | undefined>(() => {
    const preselect = searchParams.get('name');
    if (preselect && isGeneName(preselect)) {
      return preselect;
    }
    return undefined;
  }, [searchParams]);

  const query = search.toLowerCase();
  const filtered = (Object.entries(GENES) as [GeneNames, GeneData][]).filter(
    ([name, gene]) => {
      if (cat !== 'all' && gene.category !== cat) return false;
      if (query && !name.toLowerCase().includes(query)) return false;
      return true;
    },
  );

  const selectedGene = selected ? GENES[selected] : null;
  const selectedLoc = selected ? GENE_LOC[selected] : undefined;

  return (
    <div className="two-col">
      <div>
        <GeneFilters
          search={search}
          cat={cat}
          onSearch={setSearch}
          onCat={setCat}
        />
        <GeneList entries={filtered} selected={selected} />
      </div>
      <div>
        {selectedGene && selected ? (
          <GeneDetail
            name={selected}
            gene={selectedGene}
            location={selectedLoc ?? undefined}
          />
        ) : (
          <div className={`card info ${styles.geneLookupEmpty}`}>
            Select a gene to view details
          </div>
        )}
      </div>
    </div>
  );
};
