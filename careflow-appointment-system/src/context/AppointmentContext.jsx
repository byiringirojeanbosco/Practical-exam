import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { getFollowUpDate, createAppointmentId } from "../utils/appointments.js";
import { loadStoredState, saveStoredState } from "../utils/storage.js";
import { medicationPlan } from "../utils/mockData.js";

const AppointmentContext = createContext(null);

const defaultState = {
  selectedSymptoms: [],
  symptomNotes: "",
  selectedDoctor: null,
  appointment: {
    date: "",
    time: "",
    reason: "",
    confirmed: false,
    confirmedAt: "",
    appointmentId: ""
  },
  reminders: {
    appointment: true,
    medication: false,
    followUp: true
  },
  checkIn: {
    status: "not_started",
    checkedInAt: ""
  },
  queue: {
    active: false,
    position: 0,
    estimateMinutes: 0,
    lastUpdated: "",
    completed: false
  },
  postVisit: null
};

function mergeState(storedState) {
  if (!storedState) return defaultState;

  return {
    ...defaultState,
    ...storedState,
    appointment: {
      ...defaultState.appointment,
      ...storedState.appointment
    },
    reminders: {
      ...defaultState.reminders,
      ...storedState.reminders
    },
    checkIn: {
      ...defaultState.checkIn,
      ...storedState.checkIn
    },
    queue: {
      ...defaultState.queue,
      ...storedState.queue
    }
  };
}

function generatePostVisitSummary(state) {
  const symptomLabels = state.selectedSymptoms.map((symptom) => symptom.label).join(", ");
  const primarySymptom = state.selectedSymptoms[0]?.label?.toLowerCase() || "reported symptoms";

  return {
    diagnosis: `Reviewed for ${primarySymptom}`,
    notes: symptomLabels
      ? `Symptoms discussed: ${symptomLabels}. No emergency red flags documented during this visit.`
      : "Symptoms reviewed. No emergency red flags documented during this visit.",
    prescription: medicationPlan,
    followUpDate: getFollowUpDate(14),
    generatedAt: new Date().toISOString()
  };
}

function appointmentReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SYMPTOM": {
      const exists = state.selectedSymptoms.some((symptom) => symptom.id === action.symptom.id);
      const selectedSymptoms = exists
        ? state.selectedSymptoms.filter((symptom) => symptom.id !== action.symptom.id)
        : [...state.selectedSymptoms, action.symptom];

      return {
        ...state,
        selectedSymptoms,
        selectedDoctor: null,
        appointment: defaultState.appointment,
        checkIn: defaultState.checkIn,
        queue: defaultState.queue,
        postVisit: null
      };
    }

    case "SET_SYMPTOM_NOTES":
      return {
        ...state,
        symptomNotes: action.notes
      };

    case "SELECT_DOCTOR":
      return {
        ...state,
        selectedDoctor: action.doctor,
        appointment: {
          ...state.appointment,
          time: ""
        }
      };

    case "SET_APPOINTMENT_FIELD":
      return {
        ...state,
        appointment: {
          ...state.appointment,
          [action.field]: action.value
        }
      };

    case "CONFIRM_APPOINTMENT":
      return {
        ...state,
        appointment: {
          ...state.appointment,
          confirmed: true,
          confirmedAt: new Date().toISOString(),
          appointmentId: state.appointment.appointmentId || createAppointmentId()
        }
      };

    case "SET_REMINDER":
      return {
        ...state,
        reminders: {
          ...state.reminders,
          [action.key]: action.enabled
        }
      };

    case "CHECK_IN":
      return {
        ...state,
        checkIn: {
          status: "checked_in",
          checkedInAt: new Date().toISOString()
        },
        queue: {
          active: true,
          position: 4,
          estimateMinutes: 24,
          lastUpdated: new Date().toISOString(),
          completed: false
        }
      };

    case "ADVANCE_QUEUE": {
      if (!state.queue.active || state.queue.completed) return state;

      const nextPosition = Math.max(state.queue.position - 1, 0);
      const queueCompleted = nextPosition === 0;

      return {
        ...state,
        checkIn: {
          ...state.checkIn,
          status: queueCompleted ? "ready" : state.checkIn.status
        },
        queue: {
          ...state.queue,
          active: !queueCompleted,
          position: nextPosition,
          estimateMinutes: queueCompleted ? 0 : Math.max(state.queue.estimateMinutes - 6, 4),
          completed: queueCompleted,
          lastUpdated: new Date().toISOString()
        },
        postVisit: queueCompleted && !state.postVisit ? generatePostVisitSummary(state) : state.postVisit
      };
    }

    case "COMPLETE_VISIT":
      return {
        ...state,
        checkIn: {
          ...state.checkIn,
          status: "completed"
        },
        queue: {
          ...state.queue,
          active: false,
          position: 0,
          estimateMinutes: 0,
          completed: true
        },
        postVisit: state.postVisit || generatePostVisitSummary(state)
      };

    case "RESET_FLOW":
      return defaultState;

    default:
      return state;
  }
}

export function AppointmentProvider({ children }) {
  const [state, dispatch] = useReducer(appointmentReducer, undefined, () =>
    mergeState(loadStoredState())
  );
  const [isOnline, setIsOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  );

  useEffect(() => {
    saveStoredState(state);
  }, [state]);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const value = useMemo(
    () => ({
      state,
      isOnline,
      toggleSymptom: (symptom) => dispatch({ type: "TOGGLE_SYMPTOM", symptom }),
      setSymptomNotes: (notes) => dispatch({ type: "SET_SYMPTOM_NOTES", notes }),
      selectDoctor: (doctor) => dispatch({ type: "SELECT_DOCTOR", doctor }),
      setAppointmentField: (field, value) =>
        dispatch({ type: "SET_APPOINTMENT_FIELD", field, value }),
      confirmAppointment: () => dispatch({ type: "CONFIRM_APPOINTMENT" }),
      setReminder: (key, enabled) => dispatch({ type: "SET_REMINDER", key, enabled }),
      checkIn: () => dispatch({ type: "CHECK_IN" }),
      advanceQueue: () => dispatch({ type: "ADVANCE_QUEUE" }),
      completeVisit: () => dispatch({ type: "COMPLETE_VISIT" }),
      resetFlow: () => dispatch({ type: "RESET_FLOW" })
    }),
    [state, isOnline]
  );

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export function useAppointment() {
  const context = useContext(AppointmentContext);

  if (!context) {
    throw new Error("useAppointment must be used inside AppointmentProvider");
  }

  return context;
}
