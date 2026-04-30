import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";
import SymptomPage from "../features/symptoms/SymptomPage.jsx";
import DoctorDiscoveryPage from "../features/doctors/DoctorDiscoveryPage.jsx";
import BookingPage from "../features/booking/BookingPage.jsx";
import ConfirmationPage from "../features/confirmation/ConfirmationPage.jsx";
import HospitalPage from "../features/hospital/HospitalPage.jsx";
import FollowUpPage from "../features/followup/FollowUpPage.jsx";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/symptoms" replace />} />
        <Route path="/symptoms" element={<SymptomPage />} />
        <Route path="/doctors" element={<DoctorDiscoveryPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/hospital" element={<HospitalPage />} />
        <Route path="/followup" element={<FollowUpPage />} />
        <Route path="*" element={<Navigate to="/symptoms" replace />} />
      </Routes>
    </AppLayout>
  );
}
