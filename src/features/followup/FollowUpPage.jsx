import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { formatDisplayDate } from "../../utils/appointments.js";

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <label className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-3">
      <span>
        <span className="block text-sm font-bold text-gray-900">{title}</span>
        <span className="mt-1 block text-sm leading-5 text-gray-500">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-blue-600"
      />
    </label>
  );
}

export default function FollowUpPage() {
  const navigate = useNavigate();
  const { state, setReminder, completeVisit, resetFlow } = useAppointment();
  const { postVisit, reminders, selectedDoctor } = state;

  if (!postVisit) {
    return (
      <EmptyState
        title="Visit summary not ready"
        message="The post-visit plan appears after check-in and consultation are completed."
        actionLabel="Go to hospital visit"
        onAction={() => navigate("/hospital")}
      />
    );
  }

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">Step 6 of 6</Badge>
        <h2 className="text-2xl font-bold text-gray-900">Post-visit care</h2>
        <p className="text-sm leading-6 text-gray-600">
          Your summary, medicine plan, and follow-up reminders are saved locally.
        </p>
      </section>

      <Card>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="green">Visit complete</Badge>
          {selectedDoctor ? <Badge>{selectedDoctor.name}</Badge> : null}
        </div>
        <h3 className="mt-4 text-lg font-bold text-gray-900">{postVisit.diagnosis}</h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">{postVisit.notes}</p>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-gray-900">Prescription</h3>
        <div className="mt-4 grid gap-3">
          {postVisit.prescription.map((medicine) => (
            <div key={medicine.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-bold text-gray-900">{medicine.name}</p>
                <Badge tone="gray">{medicine.duration}</Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">{medicine.instruction}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-gray-900">Follow-up</h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Suggested follow-up date:{" "}
          <span className="font-bold text-gray-900">{formatDisplayDate(postVisit.followUpDate)}</span>
        </p>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-gray-900">Reminder settings</h3>
        <div className="mt-4 grid gap-3">
          <ToggleRow
            title="Medication reminder"
            description="Remind me to take medicine on schedule."
            checked={reminders.medication}
            onChange={(enabled) => setReminder("medication", enabled)}
          />
          <ToggleRow
            title="Follow-up reminder"
            description="Remind me before the follow-up date."
            checked={reminders.followUp}
            onChange={(enabled) => setReminder("followUp", enabled)}
          />
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="secondary" onClick={completeVisit}>
          Keep summary saved
        </Button>
        <Button variant="ghost" onClick={resetFlow} >
          Start new appointment
        </Button>
      </div>
    </div>
  );
}
