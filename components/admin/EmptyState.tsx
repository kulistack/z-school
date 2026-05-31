type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <p className="text-sm font-semibold text-gray-950">{title}</p>

      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}