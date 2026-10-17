import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import MyOrders from '@/features/orders/pages/MyOrders';
import MyTrips from '@/features/trips/pages/MyTrips';
import Statements from '@/features/statements/pages/Statements';
import Reports from '@/features/reports/pages/Reports';
import Notifications from '@/features/notifications/pages/Notifications';
import Profile from '@/features/profile/pages/Profile';
import Login from '@/features/auth/pages/Login';
import { useAuth } from '@/features/auth/AuthContext';

interface RouteWrapperProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: RouteWrapperProps) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function GuestRoute({ children }: RouteWrapperProps) {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <MyTrips />
          </ProtectedRoute>
        }
      />
      <Route
        path="/statements"
        element={
          <ProtectedRoute>
            <Statements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
