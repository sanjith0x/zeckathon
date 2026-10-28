import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { AdvisorChatPage } from './pages/AdvisorChatPage';
import { DashboardPage } from './pages/DashboardPage';
import { BudgetPlannerPage } from './pages/BudgetPlannerPage';
import { GoalsPage } from './pages/GoalsPage';
import { MarketsPage } from './pages/MarketsPage';
import { ProfilePage } from './pages/ProfilePage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdvisor = location.pathname === '/advisor';

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-pine selection:text-paper font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/advisor" element={<AdvisorChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/budget" element={<BudgetPlannerPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      {!isAdvisor && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
