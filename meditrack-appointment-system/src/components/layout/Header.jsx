import { NavLink } from "react-router-dom";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import ProgressTracker from "./ProgressTracker.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";

const steps = [
  { to: "/symptoms", labelKey: "nav.symptoms", icon: "activity" },
  { to: "/doctors", labelKey: "nav.doctors", icon: "stethoscope" },
  { to: "/booking", labelKey: "nav.book", icon: "calendar" },
  { to: "/confirmation", labelKey: "nav.confirm", icon: "check" },
  { to: "/hospital", labelKey: "nav.visit", icon: "hospital" },
  { to: "/followup", labelKey: "nav.care", icon: "pill" }
];

export default function Header() {
  const { isOnline, state, t, logout } = useAppointment();
  const hasSavedPlan = state.appointment.confirmed || state.selectedSymptoms.length > 0;
  const userName = state.auth.user?.name;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary-text)]">
              {t("app.brand")}
            </p>
            <h1 className="mt-1 text-xl font-bold text-gray-900">{t("app.title")}</h1>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Badge tone={isOnline ? "green" : "amber"}>
              {isOnline ? t("app.online") : t("app.offlineReady")}
            </Badge>
            {hasSavedPlan ? <span className="text-xs text-gray-500">{t("app.savedLocally")}</span> : null}
            <NavLink
              to="/settings"
              className="focus-ring subtle-transition inline-flex min-h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Icon name="settings" />
              {t("app.settings")}
            </NavLink>
            {state.auth.isAuthenticated ? (
              <Button variant="secondary" size="sm" onClick={logout}>
                <Icon name="logout" className="mr-2 h-4 w-4" />
                {t("app.logout")}
              </Button>
            ) : (
              <NavLink
                to="/account"
                className="focus-ring subtle-transition inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--color-primary-soft)] bg-[var(--color-primary-soft)] px-3 text-sm font-semibold text-[var(--color-primary-text)] hover:bg-white"
              >
                <Icon name="user" />
                {t("app.login")}
              </NavLink>
            )}
          </div>
        </div>

        {state.auth.isAuthenticated && userName ? (
          <p className="mt-3 text-sm font-medium text-gray-600">
            {t("account.loggedIn")}: <span className="font-bold text-gray-900">{userName}</span>
          </p>
        ) : null}

        <nav aria-label="Appointment navigation" className="mt-4 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-3">
            {steps.map((step) => (
              <NavLink
                key={step.to}
                to={step.to}
                className={({ isActive }) =>
                  [
                    "focus-ring subtle-transition flex min-h-10 items-center gap-2 rounded-full border px-3 text-sm font-semibold",
                    isActive
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  ].join(" ")
                }
              >
                <Icon name={step.icon} />
                {t(step.labelKey)}
              </NavLink>
            ))}
          </div>
        </nav>

        <ProgressTracker />
      </div>
    </header>
  );
}
