import { toJsonSchema } from '@valibot/to-json-schema';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

import { geneInfoSchema } from '../dist/index.js';

const jsonSchema = toJsonSchema(geneInfoSchema, { target: 'draft-2020-12' });
const DIST_PATH = path.resolve(import.meta.dirname, '../dist/');

writeFileSync(
  path.resolve(DIST_PATH, 'horsey-genome.schema.json'),
  JSON.stringify(jsonSchema, null, 2),
);
