import type {
  ParsedBase,
  BaseName,
  GeneNames,
} from '@laine-hallot/horsey-parser';

import React from 'react';

import { GENES, BASE_IDX, BASES } from '@laine-hallot/horsey-parser';

import { BaseChip } from '../../components/base-chip.tsx';
import { valColor, catClass, catBorderClass } from '../../utils.ts';

import styles from './gene-result.module.css';

const GeneSelectChip: React.FC<{
  baseValue: ParsedBase;
  name: GeneNames;
  onChangeGene: (gene: ParsedBase) => void;
}> = ({ baseValue, onChangeGene }) => {
  const gene = GENES[baseValue.data.gene];
  const strandValue =
    baseValue && gene
      ? gene.alleleValues[BASE_IDX[baseValue.data.base]!]
      : null;
  return (
    <div className={styles.geneSelectChip}>
      <BaseChip b={baseValue.data.base} size="sm" />
      <select
        onChange={(event) =>
          onChangeGene({
            ...baseValue,
            data: {
              base: event.target.value as BaseName,
              gene: baseValue.data.gene,
            },
          })
        }
        defaultValue={baseValue.data.base}
        autoComplete="false"
      >
        {BASES.map((base, index) => (
          <option key={base} value={base}>
            {base}: {gene.alleleValues[index] ?? '??'}
          </option>
        ))}
      </select>
      <span className={styles.valEq}>=</span>
      <span
        className={`${styles.alleleValue}`}
        style={{ color: valColor(strandValue) }}
      >
        {strandValue}
      </span>
    </div>
  );
};

export const GeneResult: React.FC<{
  name: GeneNames;
  position: number;
  base1?: ParsedBase;
  base2?: ParsedBase;
  onChangeGene: (
    gene: ParsedBase,
    helixIndex: number,
    basePosition: number,
  ) => void;
}> = ({ name, position, base1, base2, onChangeGene }) => {
  const gene = GENES[name];
  return (
    <div
      className={`${styles.resultGene}${gene ? ` ${catBorderClass(gene.category)}` : ''}`}
    >
      <div className={styles.rpos}>P{position}</div>
      <div
        className={`${styles.rname}${gene ? ` ${catClass(gene.category)}` : ''}`}
      >
        {name}
      </div>
      <div className={styles.rval}>
        {base1 ? (
          <GeneSelectChip
            baseValue={base1}
            name={name}
            onChangeGene={(gene: ParsedBase) => onChangeGene(gene, 0, position)}
          />
        ) : (
          <span className={styles.valMissing}>—</span>
        )}
        {base2 && (
          <GeneSelectChip
            baseValue={base2}
            name={name}
            onChangeGene={(gene: ParsedBase) => onChangeGene(gene, 1, position)}
          />
        )}
      </div>
    </div>
  );
};
