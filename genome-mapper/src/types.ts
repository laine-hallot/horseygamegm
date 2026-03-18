'use strict';

export type GeneData = {
  maxValue: number;
  scale: number;
  alleleValues: number[];
  category: string;
}; // Build reverse lookup

export type GeneLocation = { helixNumber: number; position: number };
