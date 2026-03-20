import type { ParsedGenome } from './types';

import { formatHelixId } from './format';

export const genomeString = (ast: ParsedGenome): string =>
  ast.data.reduce(
    (prev, elm) =>
      prev +
      elm.data
        .map((helix) => {
          const baseString = helix.data.bases.data.reduce(
            (prevBases, curBase) => {
              return prevBases + curBase.data.base;
            },
            '',
          );
          return `${formatHelixId(helix.data.id)}:${baseString}`;
        })
        .join('\n'),
    '',
  );
