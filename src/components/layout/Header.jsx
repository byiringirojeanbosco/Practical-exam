import { NavLink } from "react-router-dom";
import Badge from "../ui/Badge.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";

const steps = [
  { to: "/symptoms", label: "Symptoms" },
  { to: "/doctors", label: "Doctors" },
  { to: "/booking", label: "Book" },
  { to: "/confirmation", label: "Confirm" },
  { to: "/hospital", label: "Visit" },
  { to: "/followup", label: "Care" }
];

export default function Header() {
  const { isOnline, state } = useAppointment();
  const hasSavedPlan = state.appointment.confirmed || state.selectedSymptoms.length > 0;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">CareFlow</p>
            <h1 className="mt-1 text-xl font-bold text-gray-900">Appointments</h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge tone={isOnline ? "green" : "amber"}>
              {isOnline ? "Online" : "Offline ready"}
            </Badge>
            {hasSavedPlan ? <span className="text-xs text-gray-500">Saved locally</span> : null}
          </div>
        </div>

        <nav aria-label="Appointment progress" className="mt-4 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-10">

           {steps.map((step) => (
  <NavLink
    key={step.to}
    to={step.to}
    className={({ isActive }) =>
      [
        "focus-ring subtle-transition flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold",
        isActive
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
      ].join(" ")
    }
  >
    {step.label}
  </NavLink>
))}

          </div>
        </nav>
      </div>
    </header>
  );
}
