export const careSteps = [
  { to: "/symptoms", labelKey: "nav.symptoms", icon: "activity" },
  { to: "/doctors", labelKey: "nav.doctors", icon: "stethoscope" },
  { to: "/booking", labelKey: "nav.book", icon: "calendar" },
  { to: "/confirmation", labelKey: "nav.confirm", icon: "check" },
  { to: "/hospital", labelKey: "nav.visit", icon: "hospital" },
  { to: "/followup", labelKey: "nav.care", icon: "pill" }
];

export function getNextCareAction(state) {
  if (!state.selectedSymptoms.length) {
    return {
      icon: "activity",
      titleKey: "summary.nextSymptoms",
      descriptionKey: "summary.nextSymptomsText",
      actionTo: "/symptoms",
      actionKey: "nav.symptoms"
    };
  }

  if (!state.selectedDoctor) {
    return {
      icon: "stethoscope",
      titleKey: "summary.nextDoctor",
      descriptionKey: "summary.nextDoctorText",
      actionTo: "/doctors",
      actionKey: "nav.doctors"
    };
  }

  if (!state.appointment.date || !state.appointment.time) {
    return {
      icon: "calendar",
      titleKey: "summary.nextBooking",
      descriptionKey: "summary.nextBookingText",
      actionTo: "/booking",
      actionKey: "nav.book"
    };
  }

  if (!state.appointment.confirmed) {
    return {
      icon: "check",
      titleKey: "summary.nextConfirm",
      descriptionKey: "summary.nextConfirmText",
      actionTo: "/confirmation",
      actionKey: "nav.confirm"
    };
  }

  if (state.checkIn.status === "not_started") {
    return {
      icon: "hospital",
      titleKey: "summary.nextVisit",
      descriptionKey: "summary.nextVisitText",
      actionTo: "/hospital",
      actionKey: "nav.visit"
    };
  }

  if (!state.postVisit) {
    return {
      icon: "bell",
      titleKey: "summary.nextQueue",
      descriptionKey: "summary.nextQueueText",
      actionTo: "/hospital",
      actionKey: "nav.visit"
    };
  }

  return {
    icon: "pill",
    titleKey: "summary.nextCare",
    descriptionKey: "summary.nextCareText",
    actionTo: "/followup",
    actionKey: "nav.care"
  };
}
