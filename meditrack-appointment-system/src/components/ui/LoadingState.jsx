export default function LoadingState({ title = "Loading", message = "Please wait a moment." }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-[var(--color-primary-soft)] border-t-[var(--color-primary)]" />
      <h2 className="mt-4 text-base font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">{message}</p>
    </div>
  );
}
