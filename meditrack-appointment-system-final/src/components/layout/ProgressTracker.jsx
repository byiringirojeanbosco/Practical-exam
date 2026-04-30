import { useAppointment } from "../../context/AppointmentContext.jsx";

export default function ProgressTracker() {
  const { progress, t } = useAppointment();

  return (
    <section aria-label="Appointment progress" className="mt-4 rounded-lg bg-gray-50 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-800">{t("settings.progressTitle")}</p>
        <p className="text-sm font-bold text-[var(--color-primary-text)]">
          {t("app.progress", { percent: progress.percent })}
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] subtle-transition"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </section>
  );
}
