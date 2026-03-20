import type { GeneNames } from './data';

export type Ok<T> = { ok: true; value: T };
export type Err<E extends { message: string } = { message: string }> = {
  ok: false;
  error: E;
};
export type Result<T, E extends { message: string } = { message: string }> =
  | Ok<T>
  | Err<E>;

export const Ok = <T>(value: T): { ok: true; value: T } => ({
  ok: true,
  value,
});

export type BaseName = 'A' | 'T' | 'C' | 'G';
export type GeneData = {
  maxValue: number;
  scale: number;
  alleleValues: number[];
  category: string;
}; // Build reverse lookup

export type GeneLocation = { helixNumber: number; position: number };

export type ParsedNode<Name extends string, T> = {
  name: Name;
  column: number;
  row: number;
  index: number;
  data: T;
};

export type ParsedRoot<T> = {
  name: 'root';
  index: number;
  data: T;
};

export type ParsedBase = ParsedNode<
  'base',
  { base: BaseName; gene: GeneNames }
>;
export type ParsedBaseSequence = ParsedNode<'base-sequence', ParsedBase[]>;
export type ParsedHelix = ParsedNode<
  'helix',
  { id: number; bases: ParsedBaseSequence }
>;
export type ParsedDoubleHelix = ParsedNode<
  'double-helix',
  [ParsedHelix, ParsedHelix]
>;
export type ParsedGenome = ParsedRoot<ParsedDoubleHelix[]>;
