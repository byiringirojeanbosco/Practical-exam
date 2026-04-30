import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { symptomOptions } from "../../utils/mockData.js";

export default function SymptomPage() {
  const navigate = useNavigate();
  const { state, toggleSymptom, setSymptomNotes } = useAppointment();
  const hasSymptoms = state.selectedSymptoms.length > 0;
  const hasChestPain = state.selectedSymptoms.some((symptom) => symptom.id === "chest-pain");

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">Step 1 of 6</Badge>
        <h2 className="text-2xl font-bold text-gray-900">What are you feeling today?</h2>
        <p className="text-sm leading-6 text-gray-600">
          Choose the closest symptoms. You can add details for the doctor after selecting.
        </p>
      </section>

      {hasChestPain ? (
        <Card className="border-red-200 bg-red-50">
          <p className="text-sm font-semibold text-red-800">Chest pain can be urgent.</p>
          <p className="mt-1 text-sm leading-6 text-red-700">
            If pain is severe, spreading, or with shortness of breath, seek emergency care now.
          </p>
        </Card>
      ) : null}

      <Card>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-gray-900">Select symptoms</h3>
          <Badge tone={hasSymptoms ? "green" : "gray"}>{state.selectedSymptoms.length} selected</Badge>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {symptomOptions.map((symptom) => {
            const isSelected = state.selectedSymptoms.some((item) => item.id === symptom.id);

            return (
              <button
                key={symptom.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleSymptom(symptom)}
                className={[
                  "focus-ring subtle-transition min-h-20 rounded-lg border p-3 text-left",
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50"
                ].join(" ")}
              >
                <span className="block text-sm font-bold text-gray-900">{symptom.label}</span>
                <span className="mt-1 block text-sm leading-5 text-gray-500">{symptom.helper}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <Input
          id="symptom-notes"
          label="Anything important to add?"
          placeholder="Example: symptoms started yesterday evening"
          value={state.symptomNotes}
          onChange={(event) => setSymptomNotes(event.target.value)}
          helperText="Keep it short. This note is saved locally with your appointment."
        />
      </Card>

      <div className="sticky bottom-0 -mx-4 border-t border-gray-200 bg-white/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
        <Button fullWidth size="lg" disabled={!hasSymptoms} onClick={() => navigate("/doctors")}>
          Find relevant doctors
        </Button>
      </div>
    </div>
  );
}
