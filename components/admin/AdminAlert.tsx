type AdminAlertProps = {
  type: "success" | "error" | "warning";
  message: string;
};

export function AdminAlert({ type, message }: AdminAlertProps) {
  const styles = {
    success: "border-green-200 bg-green-50 text-green-700",
    error: "border-red-200 bg-red-50 text-red-700",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  };

  return (
    <div className={`mt-6 rounded-xl border p-4 text-sm ${styles[type]}`}>
      {message}
    </div>
  );
}