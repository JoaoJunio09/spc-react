function MetaItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-[0.95rem] font-medium text-[var(--text-muted)]">
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default MetaItem;