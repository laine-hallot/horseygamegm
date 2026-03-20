import type { ParsedBaseSequence, ParsedGenome } from './types';

import { describe, expect, test } from 'vitest';

import { Deserialize, HELIX_MAP } from './index';

const singleHelix = 'CCATGGAATC';
const expectedSingleHelixData: ParsedBaseSequence = {
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
};

describe('baseChainParser function', () => {
  test.skip('should return success result with value that matches `expectedSingleHelixData`', () => {
    const parseResult = Deserialize.baseChainParser(
      HELIX_MAP[0]!,
      singleHelix,
      0,
      0,
    );
    expect(parseResult).toEqual({
      ok: true,
      value: expectedSingleHelixData,
    });
  });
});

const shortGenome = '00:CCATGGAATC\n00:CTATGGATTC';
const shortGenomeAst: ParsedGenome = {
  name: 'root',
  index: 0,
  data: [
    {
      column: 0,
      name: 'double-helix',
      row: 0,
      index: 0,
      data: [
        {
          name: 'helix',
          column: 0,
          row: 0,
          index: 0,
          data: {
            id: 0,
            bases: {
              name: 'base-sequence',
              column: 3,
              row: 0,
              index: 3,
              data: [
                {
                  name: 'base',
                  column: 3,
                  row: 0,
                  index: 3,
                  data: {
                    base: 'C',
                    gene: 'BONES',
                  },
                },
                {
                  name: 'base',
                  column: 4,
                  row: 0,
                  index: 4,
                  data: {
                    base: 'C',
                    gene: 'BONES2',
                  },
                },
                {
                  name: 'base',
                  column: 5,
                  row: 0,
                  index: 5,
                  data: {
                    base: 'A',
                    gene: 'OSTODERM',
                  },
                },
                {
                  column: 6,
                  row: 0,
                  index: 6,
                  data: {
                    base: 'T',
                    gene: 'OSTO_SIZE',
                  },
                  name: 'base',
                },
                {
                  column: 7,
                  row: 0,
                  index: 7,
                  data: {
                    base: 'G',
                    gene: 'GIANT_DWARF',
                  },
                  name: 'base',
                },
                {
                  column: 8,
                  row: 0,
                  index: 8,
                  data: {
                    base: 'G',
                    gene: 'TAIL_BOTTOM',
                  },
                  name: 'base',
                },
                {
                  column: 9,
                  row: 0,
                  index: 9,
                  data: {
                    base: 'A',
                    gene: 'LEG_STRETCH2',
                  },
                  name: 'base',
                },
                {
                  column: 10,
                  row: 0,
                  index: 10,
                  data: {
                    base: 'A',
                    gene: 'ARM_STRETCH2',
                  },
                  name: 'base',
                },
                {
                  column: 11,
                  row: 0,
                  index: 11,
                  data: {
                    base: 'T',
                    gene: 'HEAD_THICK_SKULL',
                  },
                  name: 'base',
                },
                {
                  column: 12,
                  row: 0,
                  index: 12,
                  data: {
                    base: 'C',
                    gene: 'NECK_STIFF',
                  },
                  name: 'base',
                },
              ],
            },
          },
        },
        {
          name: 'helix',
          column: 0,
          row: 1,
          index: 14,
          data: {
            id: 0,
            bases: {
              name: 'base-sequence',
              column: 3,
              row: 1,
              index: 17,
              data: [
                {
                  column: 3,
                  row: 1,
                  index: 17,
                  data: {
                    base: 'C',
                    gene: 'BONES',
                  },
                  name: 'base',
                },
                {
                  column: 4,
                  row: 1,
                  index: 18,
                  data: {
                    base: 'T',
                    gene: 'BONES2',
                  },
                  name: 'base',
                },
                {
                  column: 5,
                  row: 1,
                  index: 19,
                  data: {
                    base: 'A',
                    gene: 'OSTODERM',
                  },
                  name: 'base',
                },
                {
                  column: 6,
                  row: 1,
                  index: 20,
                  data: {
                    base: 'T',
                    gene: 'OSTO_SIZE',
                  },
                  name: 'base',
                },
                {
                  column: 7,
                  row: 1,
                  index: 21,
                  data: {
                    base: 'G',
                    gene: 'GIANT_DWARF',
                  },
                  name: 'base',
                },
                {
                  column: 8,
                  row: 1,
                  index: 22,
                  data: {
                    base: 'G',
                    gene: 'TAIL_BOTTOM',
                  },
                  name: 'base',
                },
                {
                  column: 9,
                  row: 1,
                  index: 23,
                  data: {
                    base: 'A',
                    gene: 'LEG_STRETCH2',
                  },
                  name: 'base',
                },
                {
                  column: 10,
                  row: 1,
                  index: 24,
                  data: {
                    base: 'T',
                    gene: 'ARM_STRETCH2',
                  },
                  name: 'base',
                },
                {
                  column: 11,
                  row: 1,
                  index: 25,
                  data: {
                    base: 'T',
                    gene: 'HEAD_THICK_SKULL',
                  },
                  name: 'base',
                },
                {
                  column: 12,
                  row: 1,
                  index: 26,
                  data: {
                    base: 'C',
                    gene: 'NECK_STIFF',
                  },
                  name: 'base',
                },
              ],
            },
          },
        },
      ],
    },
  ],
};

describe('parseGenome function', () => {
  test('should return success result with value that matches `doubleHelixAst`', () => {
    const parseResult = Deserialize.parseGenome(shortGenome);
    expect(parseResult).toEqual({
      ok: true,
      value: shortGenomeAst,
    });
  });
});
