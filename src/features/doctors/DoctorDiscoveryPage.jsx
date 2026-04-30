import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { doctors } from "../../utils/mockData.js";

function scoreDoctor(doctor, selectedSymptoms) {
  const symptomTags = selectedSymptoms.flatMap((symptom) => symptom.tags);
  const directMatches = symptomTags.filter((tag) => tag === doctor.specialtyTag).length;
  const generalMatch = doctor.specialtyTag === "family-medicine" ? 0.5 : 0;

  return directMatches + generalMatch + doctor.rating / 100;
}

export default function DoctorDiscoveryPage() {
  const navigate = useNavigate();
  const { state, selectDoctor } = useAppointment();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, [state.selectedSymptoms]);

  const recommendedDoctors = useMemo(() => {
    if (!state.selectedSymptoms.length) return [];

    return doctors
      .map((doctor) => ({
        ...doctor,
        matchScore: scoreDoctor(doctor, state.selectedSymptoms)
      }))
      .filter((doctor) => doctor.matchScore > 0.2)
      .sort((a, b) => b.matchScore - a.matchScore || b.rating - a.rating);
  }, [state.selectedSymptoms]);

  function handleSelectDoctor(doctor) {
    selectDoctor(doctor);
    navigate("/booking");
  }

  if (!state.selectedSymptoms.length) {
    return (
      <EmptyState
        title="Start with symptoms"
        message="Select one or more symptoms so the app can suggest the most relevant doctors."
        actionLabel="Choose symptoms"
        onAction={() => navigate("/symptoms")}
      />
    );
  }

  if (isLoading) {
    return (
      <LoadingState
        title="Matching doctors"
        message="Checking specialties and earliest availability from saved hospital data."
      />
    );
  }

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">Step 2 of 6</Badge>
        <h2 className="text-2xl font-bold text-gray-900">Recommended doctors</h2>
        <p className="text-sm leading-6 text-gray-600">
          Matches are based on your symptoms, specialty fit, availability, and rating.
        </p>
      </section>

      <Card>
        <h3 className="text-sm font-bold text-gray-900">Your selected symptoms</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {state.selectedSymptoms.map((symptom) => (
            <Badge key={symptom.id} tone="blue">
              {symptom.label}
            </Badge>
          ))}
        </div>
      </Card>

      {recommendedDoctors.length ? (
        <div className="grid gap-4">
          {recommendedDoctors.map((doctor, index) => (
            <Card key={doctor.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                    {index === 0 ? <Badge tone="green">Best match</Badge> : null}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-blue-700">{doctor.specialty}</p>
                </div>
                <Badge tone="gray">{doctor.rating.toFixed(1)} rating</Badge>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">{doctor.bio}</p>

              <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Available
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-gray-900">{doctor.nextAvailable}</dd>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-gray-900">{doctor.location}</dd>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Walk-in
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-gray-900">
                    {doctor.acceptsWalkIn ? "Supported" : "Appointment only"}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {doctor.languages.map((language) => (
                  <Badge key={language}>{language}</Badge>
                ))}
              </div>

              <Button className="mt-5" fullWidth onClick={() => handleSelectDoctor(doctor)}>
                Choose this doctor
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No exact specialty match"
          message="Try selecting a broader symptom or choose Family Medicine for first assessment."
          actionLabel="Update symptoms"
          onAction={() => navigate("/symptoms")}
        />
      )}
    </div>
  );
}
