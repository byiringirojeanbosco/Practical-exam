import Header from "./Header.jsx";
import BottomNavigation from "./BottomNavigation.jsx";
import CareSummary from "./CareSummary.jsx";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 pb-32 pt-5 sm:pt-8">
        <div className="mx-auto max-w-3xl">
          <CareSummary />
          {children}
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
