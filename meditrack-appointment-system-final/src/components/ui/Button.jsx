const variantClasses = {
  primary:
    "bg-[var(--color-primary)] text-white border-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]",
  secondary:
    "bg-white text-[var(--color-primary-text)] border-[var(--color-primary-soft)] hover:bg-[var(--color-primary-soft)]",
  ghost: "bg-transparent text-gray-700 border-transparent hover:bg-gray-100"
};

const sizeClasses = {
  sm: "min-h-10 px-3 text-sm",
  md: "min-h-12 px-4 text-sm",
  lg: "min-h-14 px-5 text-base"
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  const disabledClasses = "disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "focus-ring subtle-transition inline-flex items-center justify-center rounded-lg border font-semibold",
        "active:shadow-none",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        disabledClasses,
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
