import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import Input from "../../components/ui/Input.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { getTodayInputValue } from "../../utils/appointments.js";

export default function BookingPage() {
  const navigate = useNavigate();
  const { state, setAppointmentField } = useAppointment();
  const [triedSubmit, setTriedSubmit] = useState(false);

  const doctor = state.selectedDoctor;
  const appointment = state.appointment;
  const today = useMemo(() => getTodayInputValue(), []);
  const missingDate = triedSubmit && !appointment.date;
  const missingTime = triedSubmit && !appointment.time;

  function handleReview() {
    setTriedSubmit(true);

    if (!appointment.date || !appointment.time) return;

    navigate("/confirmation");
  }

  if (!doctor) {
    return (
      <EmptyState
        title="Choose a doctor first"
        message="Doctor availability is needed before you can select an appointment time."
        actionLabel="Find doctors"
        onAction={() => navigate("/doctors")}
      />
    );
  }

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">Step 3 of 6</Badge>
        <h2 className="text-2xl font-bold text-gray-900">Book your appointment</h2>
        <p className="text-sm leading-6 text-gray-600">
          Pick a date and time. Your selection is saved on this device.
        </p>
      </section>

      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
            <p className="mt-1 text-sm font-semibold text-blue-700">{doctor.specialty}</p>
          </div>
          <Badge tone="green">{doctor.nextAvailable}</Badge>
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">{doctor.location}</p>
      </Card>

      <Card>
        <Input
          id="appointment-date"
          label="Appointment date"
          type="date"
          min={today}
          value={appointment.date}
          required
          error={missingDate ? "Choose a date to continue." : ""}
          onChange={(event) => setAppointmentField("date", event.target.value)}
        />

        <div className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-gray-900">Available time slots</h3>
            {missingTime ? <span className="text-sm font-semibold text-red-600">Choose one</span> : null}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {doctor.availability.map((time) => {
              const isSelected = appointment.time === time;

              return (
                <button
                  key={time}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setAppointmentField("time", time)}
                  className={[
                    "focus-ring subtle-transition min-h-12 rounded-lg border text-sm font-bold",
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-blue-50"
                  ].join(" ")}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <Input
            id="visit-reason"
            label="Reason for visit"
            placeholder="Example: fever and cough"
            value={appointment.reason}
            onChange={(event) => setAppointmentField("reason", event.target.value)}
            helperText="Optional. This helps reception and the doctor prepare."
          />
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="secondary" fullWidth onClick={() => navigate("/doctors")}>
          Change doctor
        </Button>
        <Button fullWidth onClick={handleReview}>
          Review appointment
        </Button>
      </div>
    </div>
  );
}
