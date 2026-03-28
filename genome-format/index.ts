import * as v from 'valibot';

export const baseNamesSchema = v.union([
  v.literal('A'),
  v.literal('T'),
  v.literal('G'),
  v.literal('C'),
]);

export type BaseNames = v.InferInput<typeof baseNamesSchema>;

export const baseValuesSchema = v.strictObject({
  A: v.number(),
  T: v.number(),
  G: v.number(),
  C: v.number(),
});
export type BaseValues = v.InferInput<typeof baseValuesSchema>;

export const baseCombinationsSchema = v.object({
  AA: v.string(),
  AC: v.string(),
  AG: v.string(),
  AT: v.string(),
  CA: v.string(),
  CC: v.string(),
  CG: v.string(),
  CT: v.string(),
  GA: v.string(),
  GC: v.string(),
  GG: v.string(),
  GT: v.string(),
  TA: v.string(),
  TC: v.string(),
  TG: v.string(),
  TT: v.string(),
});

export type BaseCombinations = v.InferInput<typeof baseCombinationsSchema>;

export const geneInfoSchema = v.object({
  helix: v.pipe(v.string(), v.description('Helix that this gene belongs to')),
  index: v.pipe(
    v.number(),
    v.description(
      'This genes position relative to the top of the helix (starting from 0)',
    ),
  ),
  name: v.pipe(
    v.string(),
    v.description("Name of gene in the game's genes.xml file"),
  ),
  description: v.pipe(v.string(), v.description('What the gene is for')),
  extra: v.optional(
    v.pipe(v.string(), v.description('Extra notes about the gene')),
  ),
  mutationChance: v.pipe(
    v.number(),
    v.description(
      "Chance that the gene's value will change when passed on (100=stays the same, 50 means it will mutate 50% of the time",
    ),
  ),
  scaleFactor: v.pipe(v.number(), v.description('Scaling value')),
  baseValues: v.pipe(baseValuesSchema, v.description('Value of each base')),
  baseCombinations: v.optional(
    v.pipe(
      baseCombinationsSchema,
      v.description('An optional map of base combinations and their effects'),
    ),
  ),
  baseDominance: v.pipe(
    v.array(baseNamesSchema),
    v.description('Bases sorted from most to least dominant'),
  ),
});

export type GeneInfo = v.InferInput<typeof geneInfoSchema>;
