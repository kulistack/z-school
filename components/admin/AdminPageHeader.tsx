type AdminPageHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function AdminPageHeader({
  label = "Admin",
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
          {label}
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-950">{title}</h1>

        {description ? (
          <p className="mt-2 text-gray-600">{description}</p>
        ) : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}