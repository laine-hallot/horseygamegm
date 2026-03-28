import type {
  BaseName,
  ParsedBase,
  ParsedBaseSequence,
  ParsedDoubleHelix,
  ParsedGenome,
  ParsedHelix,
} from './types';

import { describe, expect, test } from 'vitest';

import { HELIX_MAP, type GeneNames } from './index';
import {
  parseBaseChain,
  parseDoubleHelix,
  parseGenome,
  parseHelix,
} from './deserialize';

type DumbGeneAndBase = [BaseName, GeneNames];
type DumbHelix = [string, DumbGeneAndBase[]];
type DumbDoubleHelix = [string, [DumbHelix, DumbHelix]];
type DumbGenome = [string, [DumbHelix, DumbHelix]][];

const HELIX_HEADER_LENGTH = 3;

const dumbGeneAndBaseToParsedBase = (
  bases: DumbGeneAndBase[],
  row: number,
  startIndex: number,
): ParsedBase[] =>
  bases.map(([base, gene], i) => ({
    name: 'base',
    column: HELIX_HEADER_LENGTH + i,
    row,
    index: startIndex + i,
    data: { base, gene },
  }));

const dumbHelixToParsedBaseSequence = (
  [_str, pairs]: DumbHelix,
  row: number,
  startIndex: number,
): ParsedBaseSequence => ({
  name: 'base-sequence',
  column: HELIX_HEADER_LENGTH,
  row,
  index: startIndex,
  data: pairs.map(([base, gene], i) => ({
    name: 'base',
    column: HELIX_HEADER_LENGTH + i,
    row,
    index: startIndex + i,
    data: { base, gene },
  })),
});

const dumbHelixToParsedHelix = (
  helix: DumbHelix,
  helixId: number,
  row: number,
  parentCursor: number,
): ParsedHelix => ({
  name: 'helix',
  column: 0,
  row,
  index: parentCursor,
  data: {
    id: helixId,
    bases: dumbHelixToParsedBaseSequence(
      helix,
      row,
      parentCursor + HELIX_HEADER_LENGTH,
    ),
  },
});

const dumbDoubleHelixToParsedDoubleHelix = (
  [idStr, [line1, line2]]: DumbDoubleHelix,
  row: number,
  parentCursor: number,
): ParsedDoubleHelix => {
  const helixId = parseInt(idStr, 10);
  const line1Length = HELIX_HEADER_LENGTH + line1[1].length;
  return {
    name: 'double-helix',
    column: 0,
    row,
    index: parentCursor,
    data: [
      dumbHelixToParsedHelix(line1, helixId, row, parentCursor),
      dumbHelixToParsedHelix(
        line2,
        helixId,
        row + 1,
        parentCursor + line1Length + 1,
      ),
    ],
  };
};

const dumbHelixToString = ([idStr, [line1, line2]]: DumbDoubleHelix): string =>
  `${idStr}:${line1[0]}\n${idStr}:${line2[0]}`;

const dumbGenomeToParsedGenome = (genome: DumbGenome): ParsedGenome => {
  let cursor = 0;
  let row = 0;
  const helices: ParsedDoubleHelix[] = [];
  for (const dh of genome) {
    const node = dumbDoubleHelixToParsedDoubleHelix(dh, row, cursor);
    helices.push(node);
    const [_id, [line1, line2]] = dh;
    const dhLength =
      HELIX_HEADER_LENGTH +
      line1[1].length +
      1 +
      HELIX_HEADER_LENGTH +
      line2[1].length;
    cursor += dhLength + 1;
    row += 2;
  }
  return { name: 'root', index: 0, data: helices };
};

const dumbGenomeToString = (genome: DumbGenome): string =>
  genome.map((dh) => dumbHelixToString(dh)).join('\n');

const baseChain00: DumbGeneAndBase[] = [
  ['C', 'BONES'],
  ['C', 'BONES2'],
  ['A', 'OSTODERM'],
  ['T', 'OSTO_SIZE'],
  ['G', 'GIANT_DWARF'],
  ['G', 'TAIL_BOTTOM'],
  ['A', 'LEG_STRETCH2'],
  ['A', 'ARM_STRETCH2'],
  ['T', 'HEAD_THICK_SKULL'],
  ['C', 'NECK_STIFF'],
];

const baseChain = baseChain00.map(([base]) => base).join('');
const expectedBaseChainData: ParsedBaseSequence = {
  name: 'base-sequence',
  column: HELIX_HEADER_LENGTH,
  row: 0,
  index: HELIX_HEADER_LENGTH,
  data: dumbGeneAndBaseToParsedBase(baseChain00, 0, HELIX_HEADER_LENGTH),
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

// ── Single-helix test data ────────────────────────────────────────────────────

const dumbHelix00: DumbHelix = [
  'CCATGGAATC',
  [
    ['C', 'BONES'],
    ['C', 'BONES2'],
    ['A', 'OSTODERM'],
    ['T', 'OSTO_SIZE'],
    ['G', 'GIANT_DWARF'],
    ['G', 'TAIL_BOTTOM'],
    ['A', 'LEG_STRETCH2'],
    ['A', 'ARM_STRETCH2'],
    ['T', 'HEAD_THICK_SKULL'],
    ['C', 'NECK_STIFF'],
  ],
];

const singleHelix = `00:${dumbHelix00[0]}`;
const singleHelixAst: ParsedHelix = dumbHelixToParsedHelix(
  dumbHelix00,
  0,
  0,
  0,
);

describe('helixParser function', () => {
  test.skip('should return success result with value that matches `singleHelixAst`', () => {
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

// ── Double-helix test data ────────────────────────────────────────────────────

const dumbDoubleHelix00: DumbDoubleHelix = [
  '00',
  [
    dumbHelix00,
    [
      'CTATGGATTC',
      [
        ['C', 'BONES'],
        ['T', 'BONES2'],
        ['A', 'OSTODERM'],
        ['T', 'OSTO_SIZE'],
        ['G', 'GIANT_DWARF'],
        ['G', 'TAIL_BOTTOM'],
        ['A', 'LEG_STRETCH2'],
        ['T', 'ARM_STRETCH2'],
        ['T', 'HEAD_THICK_SKULL'],
        ['C', 'NECK_STIFF'],
      ],
    ],
  ],
];

const doubleHelix = dumbHelixToString(dumbDoubleHelix00);
const doubleHelixAst: ParsedDoubleHelix = dumbDoubleHelixToParsedDoubleHelix(
  dumbDoubleHelix00,
  0,
  0,
);

describe('parseDoubleHelix function', () => {
  test('should return success result with value that matches `doubleHelixAst`', () => {
    const [lineOne, lineTwo] = doubleHelix.split('\n');
    const parseResult = parseDoubleHelix(lineOne!, lineTwo, 0, 0);
    expect(parseResult).toEqual({
      ok: true,
      value: { doubleHelix: doubleHelixAst, textLength: doubleHelix.length },
    });
  });
});

// ── Full-genome test data ─────────────────────────────────────────────────────

const dumbGenome: DumbGenome = [
  dumbDoubleHelix00,
  [
    '01',
    [
      [
        'CTATGGATTCAAA',
        [
          ['C', 'GUT'],
          ['T', 'GUT_IS_UDDER'],
          ['A', 'DERRIERE'],
          ['T', 'LEG_IS_CIRCLE'],
          ['G', 'FOOT_IS_CIRCLE'],
          ['G', 'TONGUE'],
          ['A', 'TONGUE_SEGS'],
          ['T', 'BELLY_ALT'],
          ['T', 'PAT_BELLY'],
          ['C', 'LITTER_SIZE'],
          ['A', 'OLD_AGE'],
          ['A', 'OMNIVORE'],
          ['A', 'LIMP'],
        ],
      ],
      [
        'CTATGGATTCAAA',
        [
          ['C', 'GUT'],
          ['T', 'GUT_IS_UDDER'],
          ['A', 'DERRIERE'],
          ['T', 'LEG_IS_CIRCLE'],
          ['G', 'FOOT_IS_CIRCLE'],
          ['G', 'TONGUE'],
          ['A', 'TONGUE_SEGS'],
          ['T', 'BELLY_ALT'],
          ['T', 'PAT_BELLY'],
          ['C', 'LITTER_SIZE'],
          ['A', 'OLD_AGE'],
          ['A', 'OMNIVORE'],
          ['A', 'LIMP'],
        ],
      ],
    ],
  ],
  [
    '02',
    [
      [
        'CAGCCGTGAGGGT',
        [
          ['C', 'MUSCLE_USE'],
          ['A', 'TAIL_STIFF'],
          ['G', 'LEG_FLEXIBILITY'],
          ['C', 'LEG_FLEX_BIAS'],
          ['C', 'TAIL_FLEXIBILITY'],
          ['G', 'TAIL_SPEED'],
          ['T', 'LEG_AND_ARM_LIMP'],
          ['G', 'ARM_STRENGTH'],
          ['A', 'ARM_FLEXIBILITY'],
          ['G', 'ARM_FLEX_BIAS'],
          ['G', 'NECK_FLEXIBILITY'],
          ['G', 'NECK_FLEX_BIAS'],
          ['T', 'BRAIN_SPASTIC'],
        ],
      ],
      [
        'CAGCCGTGAGGGT',
        [
          ['C', 'MUSCLE_USE'],
          ['A', 'TAIL_STIFF'],
          ['G', 'LEG_FLEXIBILITY'],
          ['C', 'LEG_FLEX_BIAS'],
          ['C', 'TAIL_FLEXIBILITY'],
          ['G', 'TAIL_SPEED'],
          ['T', 'LEG_AND_ARM_LIMP'],
          ['G', 'ARM_STRENGTH'],
          ['A', 'ARM_FLEXIBILITY'],
          ['G', 'ARM_FLEX_BIAS'],
          ['G', 'NECK_FLEXIBILITY'],
          ['G', 'NECK_FLEX_BIAS'],
          ['T', 'BRAIN_SPASTIC'],
        ],
      ],
    ],
  ],
  [
    '03',
    [
      [
        'ACCGAATCTGCCGCC',
        [
          ['A', 'SPLAY'],
          ['C', 'LEG_IN'],
          ['C', 'LEG_IN2'],
          ['G', 'TAIL_ANGLE'],
          ['A', 'TAIL_JOINT_TYPE'],
          ['A', 'LEG_JOINT_TYPE'],
          ['T', 'HAS_KNEE'],
          ['C', 'KNEE_MIN'],
          ['T', 'KNEE_MAX'],
          ['G', 'ARM_JOINT_TYPE'],
          ['C', 'HAS_ELBOW'],
          ['C', 'ELBOW_RANGE'],
          ['G', 'NECK_JOINT_TYPE'],
          ['C', 'HEAD_JOINTED'],
          ['C', 'STIFF_JOINTS'],
        ],
      ],
      [
        'ACCGAATCTGCCGCC',
        [
          ['A', 'SPLAY'],
          ['C', 'LEG_IN'],
          ['C', 'LEG_IN2'],
          ['G', 'TAIL_ANGLE'],
          ['A', 'TAIL_JOINT_TYPE'],
          ['A', 'LEG_JOINT_TYPE'],
          ['T', 'HAS_KNEE'],
          ['C', 'KNEE_MIN'],
          ['T', 'KNEE_MAX'],
          ['G', 'ARM_JOINT_TYPE'],
          ['C', 'HAS_ELBOW'],
          ['C', 'ELBOW_RANGE'],
          ['G', 'NECK_JOINT_TYPE'],
          ['C', 'HEAD_JOINTED'],
          ['C', 'STIFF_JOINTS'],
        ],
      ],
    ],
  ],
  [
    '04',
    [
      [
        'AGCGGCACGGT',
        [
          ['A', 'LEG_TAG'],
          ['G', 'LEG_HAS_FOOT'],
          ['C', 'LEG_COUNT'],
          ['G', 'LEG_THRUST_BACK'],
          ['G', 'ARM_TAG'],
          ['C', 'ARM_HAS_HAND'],
          ['A', 'NECK_TAG'],
          ['C', 'NECK_SLOUCH'],
          ['G', 'NECK_ONTOP'],
          ['G', 'BREAK_FORCE'],
          ['T', 'EAR_X'],
        ],
      ],
      [
        'AGCGGCACGGT',
        [
          ['A', 'LEG_TAG'],
          ['G', 'LEG_HAS_FOOT'],
          ['C', 'LEG_COUNT'],
          ['G', 'LEG_THRUST_BACK'],
          ['G', 'ARM_TAG'],
          ['C', 'ARM_HAS_HAND'],
          ['A', 'NECK_TAG'],
          ['C', 'NECK_SLOUCH'],
          ['G', 'NECK_ONTOP'],
          ['G', 'BREAK_FORCE'],
          ['T', 'EAR_X'],
        ],
      ],
    ],
  ],
  [
    '05',
    [
      [
        'CTACATGG',
        [
          ['C', 'QUADRUPED'],
          ['T', 'BIPED'],
          ['A', 'UPARM_TAG'],
          ['C', 'UPARM_Y'],
          ['A', 'UPARM_GOOFY'],
          ['T', 'ARM_FORWARD'],
          ['G', 'UPARM_ANGLE'],
          ['G', 'WHITE_IS_LETHAL'],
        ],
      ],
      [
        'CTACATGA',
        [
          ['C', 'QUADRUPED'],
          ['T', 'BIPED'],
          ['A', 'UPARM_TAG'],
          ['C', 'UPARM_Y'],
          ['A', 'UPARM_GOOFY'],
          ['T', 'ARM_FORWARD'],
          ['G', 'UPARM_ANGLE'],
          ['A', 'WHITE_IS_LETHAL'],
        ],
      ],
    ],
  ],
  [
    '06',
    [
      [
        'AGGTCAACGGC',
        [
          ['A', 'ASPECT'],
          ['G', 'SKINNY'],
          ['G', 'CHEST_BIG'],
          ['T', 'CHEST_SMALL'],
          ['C', 'NECK_TYPE'],
          ['A', 'NECK_LENGTH'],
          ['A', 'NECK_GIRAFFE'],
          ['C', 'NECK_THICKNESS'],
          ['G', 'NECK_ANGLE'],
          ['G', 'NECK_COCK'],
          ['C', 'NECK_SIZE'],
        ],
      ],
      [
        'AGGTCAACGTC',
        [
          ['A', 'ASPECT'],
          ['G', 'SKINNY'],
          ['G', 'CHEST_BIG'],
          ['T', 'CHEST_SMALL'],
          ['C', 'NECK_TYPE'],
          ['A', 'NECK_LENGTH'],
          ['A', 'NECK_GIRAFFE'],
          ['C', 'NECK_THICKNESS'],
          ['G', 'NECK_ANGLE'],
          ['T', 'NECK_COCK'],
          ['C', 'NECK_SIZE'],
        ],
      ],
    ],
  ],
  [
    '07',
    [
      [
        'TGGCAATT',
        [
          ['T', 'TAIL_TAG'],
          ['G', 'TAIL_EXISTS'],
          ['G', 'TAIL_SIZE'],
          ['C', 'TAIL_SHORT'],
          ['A', 'TAIL_ASPECT'],
          ['A', 'TAIL_SHAPE'],
          ['T', 'TAIL_SEGMENTS'],
          ['T', 'TAIL_WAG'],
        ],
      ],
      [
        'TGGCAATT',
        [
          ['T', 'TAIL_TAG'],
          ['G', 'TAIL_EXISTS'],
          ['G', 'TAIL_SIZE'],
          ['C', 'TAIL_SHORT'],
          ['A', 'TAIL_ASPECT'],
          ['A', 'TAIL_SHAPE'],
          ['T', 'TAIL_SEGMENTS'],
          ['T', 'TAIL_WAG'],
        ],
      ],
    ],
  ],
  [
    '08',
    [
      [
        'TCGTGACAGTC',
        [
          ['T', 'LEG_TYPE'],
          ['C', 'LEG_LENGTH'],
          ['G', 'LEG_STRETCH'],
          ['T', 'LEG_SKEW'],
          ['G', 'LEG_STRENGTH'],
          ['A', 'LEG_PENCIL'],
          ['C', 'ARM_TYPE'],
          ['A', 'ARM_LENGTH'],
          ['G', 'ARM_STRETCH'],
          ['T', 'ARM_SKEW'],
          ['C', 'ARM_NODE_SCALE'],
        ],
      ],
      [
        'TCGTGACAGTC',
        [
          ['T', 'LEG_TYPE'],
          ['C', 'LEG_LENGTH'],
          ['G', 'LEG_STRETCH'],
          ['T', 'LEG_SKEW'],
          ['G', 'LEG_STRENGTH'],
          ['A', 'LEG_PENCIL'],
          ['C', 'ARM_TYPE'],
          ['A', 'ARM_LENGTH'],
          ['G', 'ARM_STRETCH'],
          ['T', 'ARM_SKEW'],
          ['C', 'ARM_NODE_SCALE'],
        ],
      ],
    ],
  ],
  [
    '09',
    [
      [
        'TGGCAAGGCCG',
        [
          ['T', 'HAS_FOOT'],
          ['G', 'FOOT_SIZE'],
          ['G', 'FOOT_CLOWN'],
          ['C', 'FOOT_THICKNESS'],
          ['A', 'FOOT_TOE'],
          ['A', 'FOOT_BACKWARDS'],
          ['G', 'HAS_HAND'],
          ['G', 'HAND_WIDTH'],
          ['C', 'HAND_LENGTH'],
          ['C', 'HAND_FINGER'],
          ['G', 'SKIN_HANDS'],
        ],
      ],
      [
        'TGGCAAGGCCG',
        [
          ['T', 'HAS_FOOT'],
          ['G', 'FOOT_SIZE'],
          ['G', 'FOOT_CLOWN'],
          ['C', 'FOOT_THICKNESS'],
          ['A', 'FOOT_TOE'],
          ['A', 'FOOT_BACKWARDS'],
          ['G', 'HAS_HAND'],
          ['G', 'HAND_WIDTH'],
          ['C', 'HAND_LENGTH'],
          ['C', 'HAND_FINGER'],
          ['G', 'SKIN_HANDS'],
        ],
      ],
    ],
  ],
  [
    '10',
    [
      [
        'GATTCGCCAATTG',
        [
          ['G', 'HEAD_SIZE'],
          ['A', 'HEAD_X_GROWTH'],
          ['T', 'HEAD_Y_GROWTH'],
          ['T', 'HEAD_ASPECT'],
          ['C', 'HEAD_SQUARE'],
          ['G', 'HEAD_HAS_BACK'],
          ['C', 'HEAD_GIANT'],
          ['C', 'HEAD_SHRUNK'],
          ['A', 'HEAD_CHIMERA'],
          ['A', 'EYEBOX_X'],
          ['T', 'EYEBOX_Y'],
          ['T', 'EYEBOX_SIZE'],
          ['G', 'SKIN_HEAD'],
        ],
      ],
      [
        'GATTCGCCAATTG',
        [
          ['G', 'HEAD_SIZE'],
          ['A', 'HEAD_X_GROWTH'],
          ['T', 'HEAD_Y_GROWTH'],
          ['T', 'HEAD_ASPECT'],
          ['C', 'HEAD_SQUARE'],
          ['G', 'HEAD_HAS_BACK'],
          ['C', 'HEAD_GIANT'],
          ['C', 'HEAD_SHRUNK'],
          ['A', 'HEAD_CHIMERA'],
          ['A', 'EYEBOX_X'],
          ['T', 'EYEBOX_Y'],
          ['T', 'EYEBOX_SIZE'],
          ['G', 'SKIN_HEAD'],
        ],
      ],
    ],
  ],
  [
    '11',
    [
      [
        'CGACAGAATCTATAC',
        [
          ['C', 'EYE_STYLE'],
          ['G', 'BUGEYE'],
          ['A', 'EYE_SIZE'],
          ['C', 'PUPIL_SIZE'],
          ['A', 'HAS_PUPIL'],
          ['G', 'BROW_SIZE'],
          ['A', 'BROW_SLANT'],
          ['A', 'EYE_HUE'],
          ['T', 'EAR_STYLE'],
          ['C', 'EAR_SHAPE'],
          ['T', 'EAR_SIZE'],
          ['A', 'EAR_ASPECT'],
          ['T', 'EAR_SLANT'],
          ['A', 'EAR_INTERIOR'],
          ['C', 'EAR_FLOP'],
        ],
      ],
      [
        'CGACAGAATCTATAC',
        [
          ['C', 'EYE_STYLE'],
          ['G', 'BUGEYE'],
          ['A', 'EYE_SIZE'],
          ['C', 'PUPIL_SIZE'],
          ['A', 'HAS_PUPIL'],
          ['G', 'BROW_SIZE'],
          ['A', 'BROW_SLANT'],
          ['A', 'EYE_HUE'],
          ['T', 'EAR_STYLE'],
          ['C', 'EAR_SHAPE'],
          ['T', 'EAR_SIZE'],
          ['A', 'EAR_ASPECT'],
          ['T', 'EAR_SLANT'],
          ['A', 'EAR_INTERIOR'],
          ['C', 'EAR_FLOP'],
        ],
      ],
    ],
  ],
  [
    '12',
    [
      [
        'CTCCCGCGGCAAC',
        [
          ['C', 'TEETH_SHAPE'],
          ['T', 'HAS_MOUTH'],
          ['C', 'MOUTH_Y'],
          ['C', 'MOUTH_SIZE'],
          ['C', 'JAW'],
          ['G', 'TEETH_UPPER'],
          ['C', 'TEETH_UPPER2'],
          ['G', 'NOSE_STYLE'],
          ['G', 'NOSE_INNY'],
          ['C', 'NOSE_Y'],
          ['A', 'NOSE_SIZE'],
          ['A', 'NOSE_INTERIOR'],
          ['C', 'FLU_IMMUNITY'],
        ],
      ],
      [
        'CTCCCGCGGCAAC',
        [
          ['C', 'TEETH_SHAPE'],
          ['T', 'HAS_MOUTH'],
          ['C', 'MOUTH_Y'],
          ['C', 'MOUTH_SIZE'],
          ['C', 'JAW'],
          ['G', 'TEETH_UPPER'],
          ['C', 'TEETH_UPPER2'],
          ['G', 'NOSE_STYLE'],
          ['G', 'NOSE_INNY'],
          ['C', 'NOSE_Y'],
          ['A', 'NOSE_SIZE'],
          ['A', 'NOSE_INTERIOR'],
          ['C', 'FLU_IMMUNITY'],
        ],
      ],
    ],
  ],
  [
    '13',
    [
      [
        'TCGAAAAGCCC',
        [
          ['T', 'HAS_ANTLERS'],
          ['C', 'ANTLER_X'],
          ['G', 'ANTLER_W'],
          ['A', 'ANTLER_H'],
          ['A', 'ANTLER_TAPER'],
          ['A', 'ANTLER_POM'],
          ['A', 'ANTLER_COLOR'],
          ['G', 'POM_COLOR'],
          ['C', 'POM_USECOLOR'],
          ['C', 'HAT_POM'],
          ['C', 'HAT_POM_IS_LID'],
        ],
      ],
      [
        'TCGAAAAGCCC',
        [
          ['T', 'HAS_ANTLERS'],
          ['C', 'ANTLER_X'],
          ['G', 'ANTLER_W'],
          ['A', 'ANTLER_H'],
          ['A', 'ANTLER_TAPER'],
          ['A', 'ANTLER_POM'],
          ['A', 'ANTLER_COLOR'],
          ['G', 'POM_COLOR'],
          ['C', 'POM_USECOLOR'],
          ['C', 'HAT_POM'],
          ['C', 'HAT_POM_IS_LID'],
        ],
      ],
    ],
  ],
  [
    '14',
    [
      [
        'ATGAAACCCGG',
        [
          ['A', 'ANTLER_REC'],
          ['T', 'ANTLER_REC2'],
          ['G', 'ANTLER_FLIP'],
          ['A', 'ANTLER_MOD'],
          ['A', 'ANTLER_SCALEH'],
          ['A', 'ANTLER_SCALEW'],
          ['C', 'ANTLER_ANGLE'],
          ['C', 'ANTLER_ANGLE2'],
          ['C', 'ANTLER_ANGLE_RAND'],
          ['G', 'ANTLER_T1'],
          ['G', 'ANTLER_T2'],
        ],
      ],
      [
        'ATGAAACCCGG',
        [
          ['A', 'ANTLER_REC'],
          ['T', 'ANTLER_REC2'],
          ['G', 'ANTLER_FLIP'],
          ['A', 'ANTLER_MOD'],
          ['A', 'ANTLER_SCALEH'],
          ['A', 'ANTLER_SCALEW'],
          ['C', 'ANTLER_ANGLE'],
          ['C', 'ANTLER_ANGLE2'],
          ['C', 'ANTLER_ANGLE_RAND'],
          ['G', 'ANTLER_T1'],
          ['G', 'ANTLER_T2'],
        ],
      ],
    ],
  ],
  [
    '15',
    [
      [
        'GGCCAACATTAGC',
        [
          ['G', 'HAT_EXISTS'],
          ['G', 'HAT_SIZE'],
          ['C', 'HAT_RAKE'],
          ['C', 'HAT_ASPECT'],
          ['A', 'HAT_TAPER'],
          ['A', 'HAT_CLONE'],
          ['C', 'HAT_BACK_SCALE'],
          ['A', 'HAT_FRONT_SCALE'],
          ['T', 'HAT_BACK_ANGLE'],
          ['T', 'HAT_FRONT_ANGLE'],
          ['A', 'HAT_ANGLE_RAND'],
          ['G', 'HAT_FLIP'],
          ['C', 'HAT_T'],
        ],
      ],
      [
        'GGCCAACATTAGC',
        [
          ['G', 'HAT_EXISTS'],
          ['G', 'HAT_SIZE'],
          ['C', 'HAT_RAKE'],
          ['C', 'HAT_ASPECT'],
          ['A', 'HAT_TAPER'],
          ['A', 'HAT_CLONE'],
          ['C', 'HAT_BACK_SCALE'],
          ['A', 'HAT_FRONT_SCALE'],
          ['T', 'HAT_BACK_ANGLE'],
          ['T', 'HAT_FRONT_ANGLE'],
          ['A', 'HAT_ANGLE_RAND'],
          ['G', 'HAT_FLIP'],
          ['C', 'HAT_T'],
        ],
      ],
    ],
  ],
  [
    '16',
    [
      [
        'ATGTCATTCTATACC',
        [
          ['A', 'BASE_BROWN'],
          ['T', 'BASE_BLACK'],
          ['G', 'BASE_RED'],
          ['T', 'BASE_GREEN'],
          ['C', 'GREEN_KNOCKOUT'],
          ['A', 'BASE_CREAM'],
          ['T', 'ALT_BLUE'],
          ['T', 'SPOT_YELLOW'],
          ['C', 'SKIN_HUE'],
          ['T', 'SKIN_HUE2'],
          ['A', 'SWAP_BASE_SPOT'],
          ['T', 'SWAP_ALT_SPOT'],
          ['A', 'WHITE'],
          ['C', 'NOSE_HUE'],
          ['C', 'HOOF_COLOR'],
        ],
      ],
      [
        'ATGTCATTCTATACC',
        [
          ['A', 'BASE_BROWN'],
          ['T', 'BASE_BLACK'],
          ['G', 'BASE_RED'],
          ['T', 'BASE_GREEN'],
          ['C', 'GREEN_KNOCKOUT'],
          ['A', 'BASE_CREAM'],
          ['T', 'ALT_BLUE'],
          ['T', 'SPOT_YELLOW'],
          ['C', 'SKIN_HUE'],
          ['T', 'SKIN_HUE2'],
          ['A', 'SWAP_BASE_SPOT'],
          ['T', 'SWAP_ALT_SPOT'],
          ['A', 'WHITE'],
          ['C', 'NOSE_HUE'],
          ['C', 'HOOF_COLOR'],
        ],
      ],
    ],
  ],
  [
    '17',
    [
      [
        'TAGGCCCATGG',
        [
          ['T', 'AGOUTI'],
          ['A', 'FOOT_IS_HOOF'],
          ['G', 'COON_EYE'],
          ['G', 'EAR_COMP'],
          ['C', 'TAIL_ALT'],
          ['C', 'PAT_SPLIT'],
          ['C', 'PAT_STRIPE'],
          ['A', 'PAT_SPOT'],
          ['T', 'PAT_PERLIN'],
          ['G', 'PAT_PERLIN2'],
          ['G', 'PAT_PERLIN_SIZE'],
        ],
      ],
      [
        'GAATGCCCATG',
        [
          ['G', 'AGOUTI'],
          ['A', 'FOOT_IS_HOOF'],
          ['A', 'COON_EYE'],
          ['T', 'EAR_COMP'],
          ['G', 'TAIL_ALT'],
          ['C', 'PAT_SPLIT'],
          ['C', 'PAT_STRIPE'],
          ['C', 'PAT_SPOT'],
          ['A', 'PAT_PERLIN'],
          ['T', 'PAT_PERLIN2'],
          ['G', 'PAT_PERLIN_SIZE'],
        ],
      ],
    ],
  ],
  [
    '18',
    [
      [
        'CGAGCCGCATC',
        [
          ['C', 'NARCOLEPSY'],
          ['G', 'SPEED_FACTOR'],
          ['A', 'NECK_SPEED'],
          ['G', 'RAMPAGE'],
          ['C', 'SPINAL_LOCO'],
          ['C', 'HIGH_INTELLECT'],
          ['G', 'L_LEG_SIGNAL'],
          ['C', 'L_ARM_SIGNAL'],
          ['A', 'L_TAIL_SIGNAL'],
          ['T', 'L_NECK_SIGNAL'],
          ['C', 'LOCO_SYNC'],
        ],
      ],
      [
        'CGAGCCGCATC',
        [
          ['C', 'NARCOLEPSY'],
          ['G', 'SPEED_FACTOR'],
          ['A', 'NECK_SPEED'],
          ['G', 'RAMPAGE'],
          ['C', 'SPINAL_LOCO'],
          ['C', 'HIGH_INTELLECT'],
          ['G', 'L_LEG_SIGNAL'],
          ['C', 'L_ARM_SIGNAL'],
          ['A', 'L_TAIL_SIGNAL'],
          ['T', 'L_NECK_SIGNAL'],
          ['C', 'LOCO_SYNC'],
        ],
      ],
    ],
  ],
  [
    '19',
    [
      [
        'TGATATGCCTGAGCTT',
        [
          ['T', 'L_LEG_FTOB_REACT'],
          ['G', 'L_LEG_FTOB_EVENT'],
          ['A', 'L_LEG_BTOF_REACT'],
          ['T', 'L_LEG_BTOF_EVENT'],
          ['A', 'L_ARM_FTOB_REACT'],
          ['T', 'L_ARM_FTOB_EVENT'],
          ['G', 'L_ARM_BTOF_REACT'],
          ['C', 'L_ARM_BTOF_EVENT'],
          ['C', 'L_TAIL_FTOB_REACT'],
          ['T', 'L_TAIL_FTOB_EVENT'],
          ['G', 'L_TAIL_BTOF_REACT'],
          ['A', 'L_TAIL_BTOF_EVENT'],
          ['G', 'L_NECK_FTOB_REACT'],
          ['C', 'L_NECK_FTOB_EVENT'],
          ['T', 'L_NECK_BTOF_REACT'],
          ['T', 'L_NECK_BTOF_EVENT'],
        ],
      ],
      [
        'TGATATGCCTGAGATT',
        [
          ['T', 'L_LEG_FTOB_REACT'],
          ['G', 'L_LEG_FTOB_EVENT'],
          ['A', 'L_LEG_BTOF_REACT'],
          ['T', 'L_LEG_BTOF_EVENT'],
          ['A', 'L_ARM_FTOB_REACT'],
          ['T', 'L_ARM_FTOB_EVENT'],
          ['G', 'L_ARM_BTOF_REACT'],
          ['C', 'L_ARM_BTOF_EVENT'],
          ['C', 'L_TAIL_FTOB_REACT'],
          ['T', 'L_TAIL_FTOB_EVENT'],
          ['G', 'L_TAIL_BTOF_REACT'],
          ['A', 'L_TAIL_BTOF_EVENT'],
          ['G', 'L_NECK_FTOB_REACT'],
          ['A', 'L_NECK_FTOB_EVENT'],
          ['T', 'L_NECK_BTOF_REACT'],
          ['T', 'L_NECK_BTOF_EVENT'],
        ],
      ],
    ],
  ],
];

const fullGenome = dumbGenomeToString(dumbGenome);
const fullGenomeAst: ParsedGenome = dumbGenomeToParsedGenome(dumbGenome);

describe('parseGenome function', () => {
  test('should return success result with value that matches `shortGenomeAst`', () => {
    const parseResult = parseGenome(fullGenome);
    expect(parseResult).toEqual({
      ok: true,
      value: fullGenomeAst,
    });
  });
});
