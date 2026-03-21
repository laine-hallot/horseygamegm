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
              name: 'base',
            },
            {
              column: 1,
              row: 0,
              index: 1,
              data: {
                base: 'C',
                gene: 'BONES2',
              },
              name: 'base',
            },
            {
              column: 2,
              row: 0,
              index: 2,
              data: {
                base: 'A',
                gene: 'OSTODERM',
              },
              name: 'base',
            },
            {
              column: 3,
              row: 0,
              index: 3,
              data: {
                base: 'T',
                gene: 'OSTO_SIZE',
              },
              name: 'base',
            },
            {
              column: 4,
              row: 0,
              index: 4,
              data: {
                base: 'G',
                gene: 'GIANT_DWARF',
              },
              name: 'base',
            },
            {
              column: 5,
              row: 0,
              index: 5,
              data: {
                base: 'G',
                gene: 'TAIL_BOTTOM',
              },
              name: 'base',
            },
            {
              column: 6,
              row: 0,
              index: 6,
              data: {
                base: 'A',
                gene: 'LEG_STRETCH2',
              },
              name: 'base',
            },
            {
              column: 7,
              row: 0,
              index: 7,
              data: {
                base: 'A',
                gene: 'ARM_STRETCH2',
              },
              name: 'base',
            },
            {
              column: 8,
              row: 0,
              index: 8,
              data: {
                base: 'T',
                gene: 'HEAD_THICK_SKULL',
              },
              name: 'base',
            },
            {
              column: 9,
              row: 0,
              index: 9,
              data: {
                base: 'C',
                gene: 'NECK_STIFF',
              },
              name: 'base',
            },
          ],
          name: 'base-sequence',
        },
      },
      name: 'helix',
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
              name: 'base',
            },
            {
              column: 1,
              row: 1,
              index: 1,
              data: {
                base: 'T',
                gene: 'BONES2',
              },
              name: 'base',
            },
            {
              column: 2,
              row: 1,
              index: 2,
              data: {
                base: 'A',
                gene: 'OSTODERM',
              },
              name: 'base',
            },
            {
              column: 3,
              row: 1,
              index: 3,
              data: {
                base: 'T',
                gene: 'OSTO_SIZE',
              },
              name: 'base',
            },
            {
              column: 4,
              row: 1,
              index: 4,
              data: {
                base: 'G',
                gene: 'GIANT_DWARF',
              },
              name: 'base',
            },
            {
              column: 5,
              row: 1,
              index: 5,
              data: {
                base: 'G',
                gene: 'TAIL_BOTTOM',
              },
              name: 'base',
            },
            {
              column: 6,
              row: 1,
              index: 6,
              data: {
                base: 'A',
                gene: 'LEG_STRETCH2',
              },
              name: 'base',
            },
            {
              column: 7,
              row: 1,
              index: 7,
              data: {
                base: 'T',
                gene: 'ARM_STRETCH2',
              },
              name: 'base',
            },
            {
              column: 8,
              row: 1,
              index: 8,
              data: {
                base: 'T',
                gene: 'HEAD_THICK_SKULL',
              },
              name: 'base',
            },
            {
              column: 9,
              row: 1,
              index: 9,
              data: {
                base: 'C',
                gene: 'NECK_STIFF',
              },
              name: 'base',
            },
          ],
          name: 'base-sequence',
        },
      },
      name: 'helix',
    },
  ],
  name: 'double-helix',
};

describe('Genome to string', () => {
  test('should return correct genome string', () => {
    const serialized = genomeString({
      index: 0,
      data: [doubleHelixAst],
      name: 'root',
    });
    expect(serialized).toEqual(doubleHelix);
  });
});
