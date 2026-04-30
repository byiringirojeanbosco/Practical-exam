# Meditrack Appointments

Mobile-first healthcare appointment system built with React, Vite, React Router,
Context API, localStorage persistence, and Tailwind CSS through the CDN script in
`index.html`.

## Run the Project

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite, usually:

```text
http://127.0.0.1:5173
```

Build for production:

```bash
npm run build
```

## Folder Structure

```text
src/
  app/
    App.jsx
  components/
    layout/
      AppLayout.jsx
      Header.jsx
      ProgressTracker.jsx
    ui/
      Badge.jsx
      Button.jsx
      Card.jsx
      EmptyState.jsx
      Icon.jsx
      Input.jsx
      LoadingState.jsx
      Modal.jsx
  context/
    AppointmentContext.jsx
  features/
    booking/
      BookingPage.jsx
    confirmation/
      ConfirmationPage.jsx
    doctors/
      DoctorDiscoveryPage.jsx
    followup/
      FollowUpPage.jsx
    hospital/
      HospitalPage.jsx
    symptoms/
      SymptomPage.jsx
    settings/
      SettingsPage.jsx
    account/
      AccountPage.jsx
  utils/
    appointments.js
    mockData.js
    storage.js
```

## Component System

- `Button` supports primary, secondary, ghost, full-width, large tap targets,
  disabled states, and active feedback.
- `Input` provides a label, helper text, required marker, and validation error
  state.
- `Card` creates a consistent medical product surface with subtle border and
  spacing.
- `Badge` shows clinical status, availability, queue, and reminder states.
- `Modal` is used for confirmation success with Escape-key close support.
- `LoadingState` is used during doctor matching.
- `EmptyState` handles blocked flows, such as booking before selecting a doctor.
- `Icon` provides lightweight medical/navigation icons without adding another
  package.
- `ProgressTracker` shows how far the patient is through the appointment flow.
- `AppLayout` and `Header` provide the mobile-first shell, saved/offline status,
  route icons, account actions, settings access, and progress navigation.

## Page Flow

1. `SymptomPage` lets users choose guided symptom chips and add short notes.
2. `DoctorDiscoveryPage` scores doctors by selected symptom tags, specialty fit,
   availability, and rating.
3. `BookingPage` collects date, time slot, and optional visit reason.
4. `ConfirmationPage` reviews the booking, stores confirmation, and manages
   reminder toggles.
5. `HospitalPage` supports check-in, arrival directions, and a simulated live
   queue that updates automatically.
6. `FollowUpPage` shows diagnosis notes, prescription, follow-up date, and
   medication/follow-up reminder toggles.
7. `SettingsPage` lets users switch color theme and language.
8. `AccountPage` provides local-only login, signup, logout, and profile state.

## Language and Theme

Meditrack supports English, Kinyarwanda, French, and Kiswahili through
`utils/preferences.js`. The same file contains the available color themes. Theme
changes update CSS variables, so reusable components automatically follow the
selected color.

## State and Offline Fallback

`AppointmentContext.jsx` owns global state for selected symptoms, doctor,
appointment details, confirmation, reminders, check-in, queue, post-visit
summary, theme, language, login/signup session, and progress tracking.

All essential state is saved to `localStorage` through `utils/storage.js` after
each state change. When the app reloads, the provider merges saved state with
safe defaults so partial appointments still recover. The header also listens to
browser online/offline events and shows an offline-ready status.

Tailwind is intentionally included through the CDN script in `index.html`, as
required. The appointment data and patient flow continue to work from saved
local state after the first app load, even in a low-connectivity environment.

## Mock Data

`utils/mockData.js` includes realistic symptom tags, doctor profiles,
availability slots, hospital directions, and a post-visit medication plan.

## Design Decisions

The UI defaults to the Meditrack light green healthcare palette and can be changed
in Settings:

- Primary: `#43A047`
- Success: `#16A34A`
- Background: `#F9FAFB`
- Text: `#111827`
- Border: `#E5E7EB`

Spacing, cards, and controls are intentionally restrained for a medical-grade,
low-stress smartphone experience.
