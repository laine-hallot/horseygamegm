// ── HELPERS ──────────────────────────────────────────────────────────────────

export const BaseChip = ({ b, size = 'sm' }: { b: string; size?: string }) => {
  if (!b || !'ATCG'.includes(b))
    return <span style={{ color: 'var(--muted)' }}>?</span>;
  return <span className={`base base-${b} base-${size}`}>{b}</span>;
};
