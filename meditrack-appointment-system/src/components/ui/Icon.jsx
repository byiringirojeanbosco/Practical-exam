const icons = {
  activity: "M4 12h4l2-7 4 14 2-7h4",
  stethoscope:
    "M6 4v5a4 4 0 0 0 8 0V4M4 4h4M12 4h4M14 14a4 4 0 0 0 8 0v-2M22 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z",
  calendar:
    "M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  check: "M20 6 9 17l-5-5",
  hospital:
    "M4 21V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16M9 21v-6h6v6M9 9h6M12 6v6M3 21h18",
  pill: "M10 21 21 10a5 5 0 0 0-7-7L3 14a5 5 0 0 0 7 7ZM8 16l8-8",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.24.61.82 1 1.55 1H21a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-1.52 1Z",
  user: "M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  logout: "M10 17 15 12l-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6M13 21h6a2 2 0 0 0 2-2"
};

export default function Icon({ name, className = "h-4 w-4", title }) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d={icons[name] || icons.activity} />
    </svg>
  );
}
