import React from 'react';

import { ALL_CATS } from '@horseygamegm/horsey-parser';

export const GeneFilters: React.FC<{
  search: string;
  cat: string;
  onSearch: (v: string) => void;
  onCat: (v: string) => void;
}> = ({ search, cat, onSearch, onCat }) => (
  <>
    <div className="field">
      <input
        type="text"
        placeholder="Search gene name..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
    <div className="field">
      <select value={cat} onChange={(e) => onCat(e.target.value)}>
        <option value="all">All categories</option>
        {ALL_CATS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  </>
);
