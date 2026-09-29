import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import StaffProtectedRoute from './components/StaffProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

const Home = lazy(() => import('./pages/Home'));
const RepairRequest = lazy(() => import('./pages/RepairRequest'));
const RepairRequestSuccess = lazy(() => import('./pages/RepairRequestSuccess'));
const TrackRepair = lazy(() => import('./pages/TrackRepair'));
const Login = lazy(() => import('./pages/Login'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const RepairDetailsPage = lazy(() => import('./pages/RepairDetailsPage'));
const RepairsPage = lazy(() => import('./pages/RepairsPage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="min-h-screen page-surface flex items-center justify-center text-[#53645e]" role="status">Loading page...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/request" element={<RepairRequest />} />
          <Route path="/request/success" element={<RepairRequestSuccess />} />
          <Route path="/track" element={<TrackRepair />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Staff Routes */}
          <Route
            path="/dashboard"
            element={
              <StaffProtectedRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </StaffProtectedRoute>
            }
          />
          <Route
            path="/repairs"
            element={
              <StaffProtectedRoute>
                <DashboardLayout>
                  <RepairsPage />
                </DashboardLayout>
              </StaffProtectedRoute>
            }
          />
          <Route
            path="/repairs/:id"
            element={
              <StaffProtectedRoute>
                <DashboardLayout>
                  <RepairDetailsPage />
                </DashboardLayout>
              </StaffProtectedRoute>
            }
          />
        </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
