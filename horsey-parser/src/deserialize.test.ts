import type {
  ParsedBaseSequence,
  ParsedDoubleHelix,
  ParsedGenome,
  ParsedHelix,
} from './types';

import { describe, expect, test } from 'vitest';

import { HELIX_MAP } from './index';
import { parseBaseChain, parseGenome, parseHelix } from './deserialize';

const baseChain = 'CCATGGAATC';
const expectedBaseChainData: ParsedBaseSequence = {
  name: 'base-sequence',
  column: 3,
  row: 0,
  index: 3,
  data: [
    {
      column: 3,
      row: 0,
      index: 3,
      data: {
        base: 'C',
        gene: 'BONES',
      },
      name: 'base',
    },
    {
      column: 4,
      row: 0,
      index: 4,
      data: {
        base: 'C',
        gene: 'BONES2',
      },
      name: 'base',
    },
    {
      column: 5,
      row: 0,
      index: 5,
      data: {
        base: 'A',
        gene: 'OSTODERM',
      },
      name: 'base',
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
};

describe('baseChainParser function', () => {
  test('should return success result with value that matches `expectedBaseChainData`', () => {
    const parseResult = parseBaseChain(HELIX_MAP[0]!, baseChain, 0, 3, 3);
    expect(parseResult).toEqual({
      ok: true,
      value: expectedBaseChainData,
    });
  });
});

const singleHelix = `00:${baseChain}`;
const singleHelixAst: ParsedHelix = {
  name: 'helix',
  column: 0,
  row: 0,
  index: 0,
  data: {
    id: 0,
    bases: expectedBaseChainData,
  },
};

describe('helixParser function', () => {
  test('should return success result with value that matches `singleHelixAst`', () => {
    const parseResult = parseHelix(singleHelix, 0, 0);
    expect(parseResult).toEqual<ReturnType<typeof parseHelix>>({
      ok: true,
      value: {
        lineData: singleHelixAst,
        helixId: 0,
        textLength: singleHelix.length,
      },
    });
  });
});

const doubleHelix = `${singleHelix}\n00:CTATGGATTC`;
const doubleHelixAst: ParsedDoubleHelix = {
  column: 0,
  name: 'double-helix',
  row: 0,
  index: 0,
  data: [
    singleHelixAst,
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
};

describe('parseDoubleHelix function', () => {
  test('should return success result with value that matches `shortGenomeAst`', () => {
    const parseResult = parseGenome(doubleHelix);
    expect(parseResult).toEqual({
      ok: true,
      value: doubleHelixAst,
    });
  });
});

const shortGenome = `${singleHelix}\n00:CTATGGATTC`;
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
        singleHelixAst,
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
  test('should return success result with value that matches `shortGenomeAst`', () => {
    const parseResult = parseGenome(shortGenome);
    expect(parseResult).toEqual({
      ok: true,
      value: shortGenomeAst,
    });
  });
});
