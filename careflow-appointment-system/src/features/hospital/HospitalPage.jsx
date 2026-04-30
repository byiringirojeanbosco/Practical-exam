import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { formatDisplayDate } from "../../utils/appointments.js";
import { hospitalDirections } from "../../utils/mockData.js";

function QueuePanel({ queue }) {
  const progress = queue.completed ? 100 : Math.max(0, (4 - queue.position) * 25);

  return (
    <Card className="border-blue-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge tone={queue.completed ? "green" : "blue"}>
            {queue.completed ? "Ready" : "Live queue"}
          </Badge>
          <h3 className="mt-3 text-xl font-bold text-gray-900">
            {queue.completed ? "Please proceed to consultation" : `${queue.position} ahead of you`}
          </h3>
        </div>
        <div className="rounded-lg bg-blue-50 px-4 py-3 text-center">
          <p className="text-2xl font-bold text-blue-700">{queue.estimateMinutes}</p>
          <p className="text-xs font-semibold text-blue-700">min</p>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-blue-600 subtle-transition"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-500">
        Updates run automatically while this screen is open. Your current queue status is also saved locally.
      </p>
    </Card>
  );
}

export default function HospitalPage() {
  const navigate = useNavigate();
  const { state, checkIn, advanceQueue, completeVisit } = useAppointment();
  const { appointment, selectedDoctor, checkIn: checkInState, queue } = state;

  useEffect(() => {
    if (!queue.active || queue.completed) return undefined;

    const timer = window.setInterval(() => {
      advanceQueue();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [queue.active, queue.completed, advanceQueue]);

  if (!appointment.confirmed || !selectedDoctor) {
    return (
      <EmptyState
        title="Confirm an appointment first"
        message="Check-in becomes available after your appointment is confirmed."
        actionLabel="Go to confirmation"
        onAction={() => navigate("/confirmation")}
      />
    );
  }

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">Step 5 of 6</Badge>
        <h2 className="text-2xl font-bold text-gray-900">Hospital check-in</h2>
        <p className="text-sm leading-6 text-gray-600">
          Use this screen when you arrive. It works with your saved appointment details.
        </p>
      </section>

      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{selectedDoctor.location}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {formatDisplayDate(appointment.date)} at {appointment.time}
            </p>
          </div>
          <Badge tone={checkInState.status === "not_started" ? "gray" : "green"}>
            {checkInState.status === "not_started" ? "Not checked in" : "Checked in"}
          </Badge>
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-gray-900">Arrival guide</h3>
        <ol className="mt-4 space-y-3">
          {hospitalDirections.map((direction, index) => (
            <li key={direction} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                {index + 1}
              </span>
              <span className="text-sm leading-6 text-gray-700">{direction}</span>
            </li>
          ))}
        </ol>
      </Card>

      {checkInState.status === "not_started" ? (
        <Button fullWidth size="lg" onClick={checkIn}>
          Check in now
        </Button>
      ) : (
        <QueuePanel queue={queue} />
      )}

      {queue.completed ? (
        <Card className="border-green-200 bg-green-50">
          <h3 className="text-lg font-bold text-green-900">Your doctor is ready</h3>
          <p className="mt-2 text-sm leading-6 text-green-800">
            After the consultation, your visit summary and medication reminder plan will be available.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Button variant="secondary" onClick={completeVisit}>
              Mark visit complete
            </Button>
            <Button onClick={() => navigate("/followup")}>View post-visit care</Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
