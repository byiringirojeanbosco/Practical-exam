const toneClasses = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  green: "bg-green-50 text-green-700 ring-green-100",
  gray: "bg-gray-100 text-gray-700 ring-gray-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  red: "bg-red-50 text-red-700 ring-red-100"
};

export default function Badge({ children, tone = "gray", className = "" }) {
  return (
    <span
      className={[
        "inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-semibold ring-1",
        toneClasses[tone],
        className
      ].join(" ")}
    >
      {children}
    </span>
  );
}
