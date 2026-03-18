import React, { useState } from 'react';

import { HELIX_MAP } from '../../data';
import { HelixResult } from './helix-result';
import { GenomeInput } from './genome-input';

const parseGenome = (text: string): [string, string][] => {
  const helices: [string, string][] = Array.from({ length: 20 }, () => [
    '',
    '',
  ]);
  const lines = text
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  let currentHelix = -1;
  for (const line of lines) {
    const numberedMatch = line.match(/^(\d{1,2})\s*:\s*([atcg]+)$/i);
    if (numberedMatch) {
      const index = parseInt(numberedMatch[1], 10);
      if (index >= 0 && index < 20) {
        const seq = numberedMatch[2].toUpperCase();
        if (!helices[index][0]) helices[index][0] = seq;
        else if (!helices[index][1]) helices[index][1] = seq;
        else helices[index][1] = seq;
      }
      continue;
    }
    const helixMatch = line.match(/helix\s*(\d+)[^:)]*[:\)]\s*([atcg]+)/i);
    const strandMatch = line.match(/(?:second\s*strand|strand\s*2)[^:]*:\s*([atcg]+)/i);
    if (helixMatch) {
      currentHelix = parseInt(helixMatch[1]);
      if (currentHelix < 20) helices[currentHelix][0] = helixMatch[2].toUpperCase();
    } else if (strandMatch && currentHelix >= 0 && currentHelix < 20) {
      helices[currentHelix][1] = strandMatch[1].toUpperCase();
    } else if (
      currentHelix >= 0 &&
      currentHelix < 20 &&
      !helices[currentHelix][1] &&
      /^[atcg]+$/i.test(line)
    ) {
      helices[currentHelix][1] = line.toUpperCase();
    }
  }
  return helices;
};

export const AnalyzerTab: React.FC = () => {
  const [text, setText] = useState('');
  const [genome, setGenome] = useState<[string, string][] | null>(null);

  const handleClear = () => {
    setText('');
    setGenome(null);
  };

  return (
    <div>
      <GenomeInput
        text={text}
        onChange={setText}
        onAnalyze={() => setGenome(parseGenome(text))}
        onClear={handleClear}
      />
      {genome && (
        <div>
          {HELIX_MAP.map((genes, helixIndex) => (
            <HelixResult
              key={helixIndex}
              helixIndex={helixIndex}
              genes={genes}
              strand1={genome[helixIndex][0]}
              strand2={genome[helixIndex][1]}
            />
          ))}
        </div>
      )}
    </div>
  );
};
