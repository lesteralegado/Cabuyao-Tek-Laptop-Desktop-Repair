import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface StaffProtectedRouteProps {
  children: React.ReactNode;
}

const StaffProtectedRoute: React.FC<StaffProtectedRouteProps> = ({ children }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!profile || (profile.role !== 'staff' && profile.role !== 'admin')) {
    // If authenticated but not staff, redirect to a generic unauthorized page or home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default StaffProtectedRoute;
