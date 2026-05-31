"use client";

type ConfirmDeleteButtonProps = {
  label?: string;
  message?: string;
  className?: string;
};

export function ConfirmDeleteButton({
  label = "Hapus",
  message = "Yakin ingin menghapus data ini?",
  className,
}: ConfirmDeleteButtonProps) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        const confirmed = window.confirm(message);

        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className={
        className ||
        "rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50"
      }
    >
      {label}
    </button>
  );
}