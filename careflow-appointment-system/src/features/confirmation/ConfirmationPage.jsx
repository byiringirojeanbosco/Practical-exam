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
        className="h-5 w-5 accent-blue-600"
      />
    </label>
  );
}

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { state, confirmAppointment, setReminder } = useAppointment();
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
        <Badge tone="blue">Step 4 of 6</Badge>
        <h2 className="text-2xl font-bold text-gray-900">Confirm your visit</h2>
        <p className="text-sm leading-6 text-gray-600">
          Review the details and choose reminder preferences.
        </p>
      </section>

      {appointment.confirmed ? (
        <Card className="border-green-200 bg-green-50">
          <Badge tone="green">Confirmed</Badge>
          <h3 className="mt-3 text-lg font-bold text-green-900">
            Appointment {appointment.appointmentId} is booked
          </h3>
          <p className="mt-2 text-sm leading-6 text-green-800">
            The confirmation is saved on this device for offline access at the hospital.
          </p>
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
        <h3 className="text-base font-bold text-gray-900">Reminders</h3>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Reminder choices are saved locally and remain available offline.
        </p>
        <div className="mt-4 grid gap-3">
          <ReminderToggle
            label="Appointment reminder"
            checked={reminders.appointment}
            onChange={(enabled) => setReminder("appointment", enabled)}
          />
          <ReminderToggle
            label="Medication reminder after visit"
            checked={reminders.medication}
            onChange={(enabled) => setReminder("medication", enabled)}
          />
          <ReminderToggle
            label="Follow-up reminder"
            checked={reminders.followUp}
            onChange={(enabled) => setReminder("followUp", enabled)}
          />
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="secondary" fullWidth onClick={() => navigate("/booking")}>
          Edit booking
        </Button>
        {appointment.confirmed ? (
          <Button fullWidth onClick={() => navigate("/hospital")}>
            Continue to check-in
          </Button>
        ) : (
          <Button fullWidth onClick={handleConfirm}>
            Confirm appointment
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
