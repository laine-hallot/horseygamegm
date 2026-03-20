import type { GeneNames } from '@horseygamegm/horsey-parser';

import React from 'react';
import { useNavigate } from 'react-router';

import { GENES, GENE_LOC, ALL_CATS } from '@horseygamegm/horsey-parser';

export const GeneSelect: React.FC<{
  value: GeneNames | undefined;
}> = ({ value }) => {
  const navigator = useNavigate();
  const handleSelectGene = (
    event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    navigator(`/crispr?name=${event.target.value as GeneNames}`);
  };

  return (
    <div className="field">
      <label>Select Gene</label>
      <select value={value} onChange={handleSelectGene}>
        <option value="">-- choose a gene --</option>
        {ALL_CATS.map((cat) => (
          <optgroup key={cat} label={cat}>
            {Object.entries(GENES)
              .filter(([, gene]) => gene.category === cat)
              .map(([name]) => {
                const location = GENE_LOC[name];
                return (
                  <option key={name} value={name}>
                    {name}
                    {location
                      ? ` [H${location.helixNumber}·P${location.position}]`
                      : ''}
                  </option>
                );
              })}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
