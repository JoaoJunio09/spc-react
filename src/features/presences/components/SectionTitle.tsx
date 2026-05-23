function SectionTitle({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-5 flex items-center gap-2 text-[1rem] font-extrabold uppercase tracking-[0.05em] text-[var(--text-muted)]">
      {icon}
      {children}
    </h3>
  );
}

export default SectionTitle;