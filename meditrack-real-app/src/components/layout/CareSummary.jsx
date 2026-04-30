import { Link, useLocation } from "react-router-dom";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";
import Icon from "../ui/Icon.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { formatDisplayDate } from "../../utils/appointments.js";
import { getNextCareAction } from "../../utils/navigation.js";

const hiddenRoutes = new Set(["/account", "/settings"]);

export default function CareSummary() {
  const location = useLocation();
  const { state, progress, t } = useAppointment();
  const nextAction = getNextCareAction(state);

  if (hiddenRoutes.has(location.pathname)) return null;

  return (
    <Card className="mb-5 border-[var(--color-primary-soft)] bg-white">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary-text)]">
          <Icon name={nextAction.icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{t("summary.carePlan")}</Badge>
            <span className="text-xs font-semibold text-gray-500">
              {t("app.progress", { percent: progress.percent })}
            </span>
          </div>
          <h2 className="mt-2 text-lg font-bold text-gray-900">{t(nextAction.titleKey)}</h2>
          <p className="mt-1 text-sm leading-5 text-gray-600">{t(nextAction.descriptionKey)}</p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] subtle-transition"
          style={{ width: `${progress.percent}%` }}
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="hidden grid-cols-2 gap-3 text-sm sm:grid">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {t("summary.doctor")}
            </p>
            <p className="mt-1 truncate font-bold text-gray-900">
              {state.selectedDoctor?.name || t("summary.notSelected")}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {t("summary.appointment")}
            </p>
            <p className="mt-1 truncate font-bold text-gray-900">
              {state.appointment.date
                ? `${formatDisplayDate(state.appointment.date)} ${state.appointment.time || ""}`
                : t("summary.notBooked")}
            </p>
          </div>
        </div>

        <Link
          to={nextAction.actionTo}
          className="focus-ring subtle-transition inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 text-sm font-bold text-white hover:bg-[var(--color-primary-dark)]"
        >
          {t(nextAction.actionKey)}
          <Icon name="chevronRight" className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
