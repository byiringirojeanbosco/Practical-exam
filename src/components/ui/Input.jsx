export default function Input({
  id,
  label,
  error,
  helperText,
  className = "",
  required = false,
  ...props
}) {
  return (
    <div className={["space-y-2", className].join(" ")}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
        {label}
        {required ? <span className="text-blue-600"> *</span> : null}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        className={[
          "focus-ring min-h-12 w-full rounded-lg border bg-white px-3 text-base text-gray-900",
          "placeholder:text-gray-400",
          error ? "border-red-400" : "border-gray-200"
        ].join(" ")}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-sm text-gray-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
