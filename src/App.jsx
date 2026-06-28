import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import NotFound from './pages/NotFound';
import './styles/globals.css';
import './styles/navbar.css';
import './styles/sections.css';
import './styles/admin.css';

// Protected route — only renders children if logged in, else shows login
function AdminRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <DataProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/admin" element={<AdminRoute />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </DataProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
