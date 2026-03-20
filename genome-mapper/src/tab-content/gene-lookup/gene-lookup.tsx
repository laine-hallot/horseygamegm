import React, { useState } from 'react';

import { GENES, GENE_LOC } from '../../data';
import { GeneDetail } from './gene-detail';
import { GeneFilters } from './gene-filter';
import { GeneList } from './gene-list';

import styles from './gene-lookup.module.css';

export const GenesTab: React.FC<{ preselect?: string }> = ({ preselect }) => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState<string | null>(preselect ?? null);

  const query = search.toLowerCase();
  const filtered = Object.entries(GENES).filter(([name, gene]) => {
    if (cat !== 'all' && gene.category !== cat) return false;
    if (query && !name.toLowerCase().includes(query)) return false;
    return true;
  });

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
        <GeneList
          entries={filtered}
          selected={selected}
          onSelect={setSelected}
        />
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
