import React from 'react';

import styles from './genome-input.module.css';

export const GenomeInput: React.FC<{
  text: string;
  onChange: (v: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
}> = ({ text, onChange, onAnalyze, onClear }) => (
  <div className="card">
    <div className="field">
      <label>Paste genome (20 helices, both strands)</label>
      <textarea
        rows={8}
        placeholder={
          'Helix 0.) atcgatcg\nSecond Strand: gctagcta\n\n(or numbered format e.g. 00:ACCTCAGGTT on each line, two lines per helix)'
        }
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    <div className={styles.genomeInputButtons}>
      <button className="btn" onClick={onAnalyze}>
        Analyze Genome
      </button>
      <button className="btn btn-ghost" onClick={onClear}>
        Clear
      </button>
    </div>
  </div>
);
