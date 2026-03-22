import type { ParsedBase, ParsedGenome } from '@laine-hallot/horsey-parser';

import React, { useContext, useEffect } from 'react';

import { HELIX_MAP } from '@laine-hallot/horsey-parser';

import { useGenome } from '../../hooks/genome';
import { ToastContext } from '../../toast-context';
import { GenomeInput } from './genome-input';
import { HelixResult } from './helix-result';

import styles from './gnome-analyzer.module.css';

export const AnalyzerTab: React.FC = () => {
  const { queueToast } = useContext(ToastContext);
  const { text, setText, genome, analyzeGenome, handleClear, modifyGene } =
    useGenome();

  const handleCopy = (event: KeyboardEvent) => {
    console.log(event);
    if (event.ctrlKey && event.key === 'c') {
      navigator.clipboard.writeText(text);
      queueToast('Copied gnome to clipboard');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCopy);

    return () => {
      window.removeEventListener('keydown', handleCopy);
    };
  }, []);

  return (
    <div className={styles.genomeAnalyzer}>
      <GenomeInput
        text={text}
        onChange={setText}
        onAnalyze={analyzeGenome}
        onClear={handleClear}
      />
      {genome === undefined ? null : genome.ok ? (
        <GenomeDisplay genome={genome.value} modifyGene={modifyGene} />
      ) : (
        <div className={styles.genomeError}>
          <span>{genome.error.message}</span>
        </div>
      )}
    </div>
  );
};

const GenomeDisplay: React.FC<{
  genome: ParsedGenome;
  modifyGene: (
    gene: ParsedBase,
    genomeIndex: number,
    helixIndex: number,
    basePosition: number,
  ) => void;
}> = ({ genome, modifyGene }) => {
  return (
    <div style={{ overflow: 'scroll', flex: 1 }}>
      {HELIX_MAP.map((genes, genomeIndex) => {
        return (
          <HelixResult
            key={genomeIndex}
            genomeIndex={genomeIndex}
            genes={genes}
            strand1={genome.data[genomeIndex]?.data[0]}
            strand2={genome.data[genomeIndex]?.data[1]}
            onChangeGene={modifyGene}
          />
        );
      })}
    </div>
  );
};
