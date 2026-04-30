import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Modal from "../../components/ui/Modal.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { formatDisplayDate } from "../../utils/appointments.js";

function ReminderToggle({ label, checked, onChange }) {
  return (
    <label className="flex min-h-14 items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-3">
      <span className="text-sm font-semibold text-gray-900">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-[var(--color-primary)]"
      />
    </label>
  );
}

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { state, confirmAppointment, setReminder, t } = useAppointment();
  const [showSuccess, setShowSuccess] = useState(false);
  const { selectedDoctor, appointment, reminders } = state;
  const canConfirm = selectedDoctor && appointment.date && appointment.time;

  function handleConfirm() {
    confirmAppointment();
    setShowSuccess(true);
  }

  if (!canConfirm) {
    return (
      <EmptyState
        title="Appointment details missing"
        message="Select a doctor, date, and time before confirming."
        actionLabel="Go to booking"
        onAction={() => navigate("/booking")}
      />
    );
  }

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">{t("confirmation.step")}</Badge>
        <h2 className="text-2xl font-bold text-gray-900">{t("confirmation.title")}</h2>
        <p className="text-sm leading-6 text-gray-600">{t("confirmation.subtitle")}</p>
      </section>

      {appointment.confirmed ? (
        <Card className="border-green-200 bg-green-50">
          <Badge tone="green">{t("confirmation.confirmed")}</Badge>
          <h3 className="mt-3 text-lg font-bold text-green-900">
            {t("confirmation.booked", { id: appointment.appointmentId })}
          </h3>
          <p className="mt-2 text-sm leading-6 text-green-800">{t("confirmation.saved")}</p>
        </Card>
      ) : null}

      <Card>
        <dl className="grid gap-4">
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
            <dt className="text-sm text-gray-500">Doctor</dt>
            <dd className="text-right text-sm font-bold text-gray-900">{selectedDoctor.name}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
            <dt className="text-sm text-gray-500">Specialty</dt>
            <dd className="text-right text-sm font-bold text-gray-900">{selectedDoctor.specialty}</dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
            <dt className="text-sm text-gray-500">Date</dt>
            <dd className="text-right text-sm font-bold text-gray-900">
              {formatDisplayDate(appointment.date)}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
            <dt className="text-sm text-gray-500">Time</dt>
            <dd className="text-right text-sm font-bold text-gray-900">{appointment.time}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="text-sm text-gray-500">Clinic</dt>
            <dd className="text-right text-sm font-bold text-gray-900">{selectedDoctor.location}</dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-gray-900">{t("confirmation.reminders")}</h3>
        <p className="mt-1 text-sm leading-6 text-gray-500">{t("confirmation.remindersText")}</p>
        <div className="mt-4 grid gap-3">
          <ReminderToggle
            label={t("confirmation.appointmentReminder")}
            checked={reminders.appointment}
            onChange={(enabled) => setReminder("appointment", enabled)}
          />
          <ReminderToggle
            label={t("confirmation.medicationReminder")}
            checked={reminders.medication}
            onChange={(enabled) => setReminder("medication", enabled)}
          />
          <ReminderToggle
            label={t("confirmation.followReminder")}
            checked={reminders.followUp}
            onChange={(enabled) => setReminder("followUp", enabled)}
          />
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="secondary" fullWidth onClick={() => navigate("/booking")}>
          {t("confirmation.edit")}
        </Button>
        {appointment.confirmed ? (
          <Button fullWidth onClick={() => navigate("/hospital")}>
            {t("confirmation.checkin")}
          </Button>
        ) : (
          <Button fullWidth onClick={handleConfirm}>
            {t("confirmation.confirm")}
          </Button>
        )}
      </div>

      <Modal
        isOpen={showSuccess}
        title="Appointment confirmed"
        description="Your booking and reminders are saved locally. You can check in when you arrive."
        onClose={() => setShowSuccess(false)}
        primaryAction={{
          label: "Go to check-in",
          onClick: () => navigate("/hospital")
        }}
        secondaryAction={{
          label: "Stay here",
          onClick: () => setShowSuccess(false)
        }}
      />
    </div>
  );
}
