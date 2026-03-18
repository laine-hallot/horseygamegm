import React from 'react';

import { GENES, GENE_LOC, ALL_CATS } from '../../data';

export const GeneSelect: React.FC<{
  value: string;
  onChange: (name: string) => void;
}> = ({ value, onChange }) => (
  <div className="field">
    <label>Select Gene</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
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
