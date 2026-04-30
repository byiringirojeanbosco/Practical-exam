import Button from "./Button.jsx";

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-lg font-bold text-[var(--color-primary-text)]">
        i
      </div>
      <h2 className="mt-4 text-base font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-gray-500">{message}</p>
      {actionLabel && onAction ? (
        <Button className="mt-5" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
