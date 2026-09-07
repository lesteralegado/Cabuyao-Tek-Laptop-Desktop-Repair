import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import StaffProtectedRoute from './components/StaffProtectedRoute';
import Home from './pages/Home';
import RepairRequest from './pages/RepairRequest';
import RepairRequestSuccess from './pages/RepairRequestSuccess';
import TrackRepair from './pages/TrackRepair';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import RepairDetailsPage from './pages/RepairDetailsPage';
import RepairsPage from './pages/RepairsPage';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
