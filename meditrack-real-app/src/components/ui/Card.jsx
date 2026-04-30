export default function Card({ children, className = "", as: Component = "section", ...props }) {
  return (
    <Component
      className={[
        "rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
