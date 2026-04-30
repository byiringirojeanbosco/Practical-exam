const variantClasses = {
  primary: "bg-blue-600 text-white border-blue-600 hover:bg-blue-700",
  secondary: "bg-white text-blue-700 border-blue-200 hover:bg-blue-50",
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
