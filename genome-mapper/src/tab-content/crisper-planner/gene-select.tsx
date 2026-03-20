import React from 'react';

import {
  GENES,
  GENE_LOC,
  ALL_CATS,
  type GeneNames,
} from '@horseygamegm/horsey-parser/src/data';

export const GeneSelect: React.FC<{
  value: GeneNames | undefined;
  onChange: (name: GeneNames) => void;
}> = ({ value, onChange }) => (
  <div className="field">
    <label>Select Gene</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as GeneNames)}
    >
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
