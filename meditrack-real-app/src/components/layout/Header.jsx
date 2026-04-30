import { NavLink } from "react-router-dom";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";

export default function Header() {
  const { isOnline, state, t, logout } = useAppointment();
  const hasSavedPlan = state.appointment.confirmed || state.selectedSymptoms.length > 0;
  const userName = state.auth.user?.name;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] text-sm font-black text-white shadow-sm">
              M
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-black leading-tight text-gray-900">
                {t("app.brand")}
              </p>
              <p className="truncate text-xs font-semibold text-gray-500">
                {userName ? t("app.welcomeBack", { name: userName }) : t("app.careCompanion")}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <NavLink
              to="/settings"
              title={t("app.settings")}
              className="focus-ring subtle-transition inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            >
              <Icon name="settings" />
            </NavLink>
            {state.auth.isAuthenticated ? (
              <Button variant="secondary" size="sm" onClick={logout} title={t("app.logout")}>
                <Icon name="logout" className="h-4 w-4" />
              </Button>
            ) : (
              <NavLink
                to="/account"
                title={t("app.login")}
                className="focus-ring subtle-transition inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-primary-soft)] bg-[var(--color-primary-soft)] text-[var(--color-primary-text)] hover:bg-white"
              >
                <Icon name="user" />
              </NavLink>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone={isOnline ? "green" : "amber"}>
            {isOnline ? t("app.online") : t("app.offlineReady")}
          </Badge>
          {hasSavedPlan ? <Badge tone="gray">{t("app.savedLocally")}</Badge> : null}
          <Badge tone="blue">{t("app.secureLocal")}</Badge>
        </div>
      </div>
    </header>
  );
}
