import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Icon from "../../components/ui/Icon.jsx";
import Input from "../../components/ui/Input.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { symptomOptions } from "../../utils/mockData.js";

export default function SymptomPage() {
  const navigate = useNavigate();
  const { state, toggleSymptom, setSymptomNotes, t } = useAppointment();
  const hasSymptoms = state.selectedSymptoms.length > 0;
  const hasChestPain = state.selectedSymptoms.some((symptom) => symptom.id === "chest-pain");

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">{t("symptoms.step")}</Badge>
        <h2 className="text-2xl font-bold text-gray-900">{t("symptoms.title")}</h2>
        <p className="text-sm leading-6 text-gray-600">{t("symptoms.subtitle")}</p>
      </section>

      <Card className="border-[var(--color-primary-soft)]">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary-text)]">
            <Icon name="shield" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{t("symptoms.safetyTitle")}</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600">{t("symptoms.safetyText")}</p>
          </div>
        </div>
      </Card>

      {hasChestPain ? (
        <Card className="border-red-200 bg-red-50">
          <p className="text-sm font-semibold text-red-800">{t("symptoms.alertTitle")}</p>
          <p className="mt-1 text-sm leading-6 text-red-700">{t("symptoms.alertText")}</p>
        </Card>
      ) : null}

      <Card>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-gray-900">{t("symptoms.select")}</h3>
          <Badge tone={hasSymptoms ? "green" : "gray"}>
            {t("symptoms.selected", { count: state.selectedSymptoms.length })}
          </Badge>
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
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)]"
                    : "border-gray-200 bg-white hover:border-[var(--color-primary-soft)] hover:bg-gray-50"
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
          label={t("symptoms.notesLabel")}
          placeholder={t("symptoms.notesPlaceholder")}
          value={state.symptomNotes}
          onChange={(event) => setSymptomNotes(event.target.value)}
          helperText={t("symptoms.notesHelp")}
        />
      </Card>

      <div>
        <Button fullWidth size="lg" disabled={!hasSymptoms} onClick={() => navigate("/doctors")}>
          {t("symptoms.findDoctors")}
        </Button>
      </div>
    </div>
  );
}
