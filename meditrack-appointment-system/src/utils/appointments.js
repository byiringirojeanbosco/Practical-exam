export function getTodayInputValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const local = new Date(today.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
}

export function formatDisplayDate(value) {
  if (!value) return "Not selected";

  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function getFollowUpDate(daysFromNow = 14) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000).toISOString().split("T")[0];
}

export function createAppointmentId() {
  return `CF-${Date.now().toString().slice(-6)}`;
}
