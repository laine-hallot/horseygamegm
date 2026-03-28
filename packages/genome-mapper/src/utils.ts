export const catClass = (cat: string): string => `cat-${cat.toLowerCase()}`;

export const catBorderClass = (cat: string): string =>
  `cat-${cat.toLowerCase()}-border`;

export const valColor = (v: number | null | undefined): string => {
  if (v === null || v === undefined) return 'var(--muted)';
  return v > 0 ? 'var(--green-hi)' : v < 0 ? 'var(--red-lo)' : 'var(--muted)';
};
