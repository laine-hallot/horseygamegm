import type { ParsedDoubleHelix } from './index';

import { describe, expect, test } from 'vitest';

import { genomeString } from './serialize';

const doubleHelix = '00:CCATGGAATC\n00:CTATGGATTC';
const doubleHelixAst: ParsedDoubleHelix = {
  column: 0,
  row: 0,
  index: 0,
  data: [
    {
      column: 0,
      row: 0,
      index: 0,
      data: {
        id: 0,
        bases: {
          column: 0,
          row: 0,
          index: 0,
          data: [
            {
              column: 0,
              row: 0,
              index: 0,
              data: {
                base: 'C',
                gene: 'BONES',
              },
            },
            {
              column: 1,
              row: 0,
              index: 1,
              data: {
                base: 'C',
                gene: 'BONES2',
              },
            },
            {
              column: 2,
              row: 0,
              index: 2,
              data: {
                base: 'A',
                gene: 'OSTODERM',
              },
            },
            {
              column: 3,
              row: 0,
              index: 3,
              data: {
                base: 'T',
                gene: 'OSTO_SIZE',
              },
            },
            {
              column: 4,
              row: 0,
              index: 4,
              data: {
                base: 'G',
                gene: 'GIANT_DWARF',
              },
            },
            {
              column: 5,
              row: 0,
              index: 5,
              data: {
                base: 'G',
                gene: 'TAIL_BOTTOM',
              },
            },
            {
              column: 6,
              row: 0,
              index: 6,
              data: {
                base: 'A',
                gene: 'LEG_STRETCH2',
              },
            },
            {
              column: 7,
              row: 0,
              index: 7,
              data: {
                base: 'A',
                gene: 'ARM_STRETCH2',
              },
            },
            {
              column: 8,
              row: 0,
              index: 8,
              data: {
                base: 'T',
                gene: 'HEAD_THICK_SKULL',
              },
            },
            {
              column: 9,
              row: 0,
              index: 9,
              data: {
                base: 'C',
                gene: 'NECK_STIFF',
              },
            },
          ],
        },
      },
    },
    {
      column: 0,
      row: 1,
      index: 0,
      data: {
        id: 0,
        bases: {
          column: 0,
          row: 0,
          index: 0,
          data: [
            {
              column: 0,
              row: 0,
              index: 0,
              data: {
                base: 'C',
                gene: 'BONES',
              },
            },
            {
              column: 1,
              row: 1,
              index: 1,
              data: {
                base: 'T',
                gene: 'BONES2',
              },
            },
            {
              column: 2,
              row: 1,
              index: 2,
              data: {
                base: 'A',
                gene: 'OSTODERM',
              },
            },
            {
              column: 3,
              row: 1,
              index: 3,
              data: {
                base: 'T',
                gene: 'OSTO_SIZE',
              },
            },
            {
              column: 4,
              row: 1,
              index: 4,
              data: {
                base: 'G',
                gene: 'GIANT_DWARF',
              },
            },
            {
              column: 5,
              row: 1,
              index: 5,
              data: {
                base: 'G',
                gene: 'TAIL_BOTTOM',
              },
            },
            {
              column: 6,
              row: 1,
              index: 6,
              data: {
                base: 'A',
                gene: 'LEG_STRETCH2',
              },
            },
            {
              column: 7,
              row: 1,
              index: 7,
              data: {
                base: 'T',
                gene: 'ARM_STRETCH2',
              },
            },
            {
              column: 8,
              row: 1,
              index: 8,
              data: {
                base: 'T',
                gene: 'HEAD_THICK_SKULL',
              },
            },
            {
              column: 9,
              row: 1,
              index: 9,
              data: {
                base: 'C',
                gene: 'NECK_STIFF',
              },
            },
          ],
        },
      },
    },
  ],
};

describe('Genome to string', () => {
  test('should return correct genome string', () => {
    const serialized = genomeString({
      index: 0,
      data: [doubleHelixAst],
    });
    expect(serialized).toEqual(doubleHelix);
  });
});
