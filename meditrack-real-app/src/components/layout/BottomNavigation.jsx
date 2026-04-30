import { NavLink } from "react-router-dom";
import Icon from "../ui/Icon.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { careSteps } from "../../utils/navigation.js";

export default function BottomNavigation() {
  const { t } = useAppointment();

  return (
    <nav
      aria-label="Primary care steps"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(17,24,39,0.08)] backdrop-blur"
    >
      <div className="mx-auto grid max-w-3xl grid-cols-6 gap-1">
        {careSteps.map((step) => (
          <NavLink
            key={step.to}
            to={step.to}
            title={t(step.labelKey)}
            className={({ isActive }) =>
              [
                "focus-ring subtle-transition flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[11px] font-semibold",
                isActive
                  ? "bg-[var(--color-primary-soft)] text-[var(--color-primary-text)]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              ].join(" ")
            }
          >
            <Icon name={step.icon} className="h-5 w-5 shrink-0" />
            <span className="w-full truncate text-center leading-none">{t(step.labelKey)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
