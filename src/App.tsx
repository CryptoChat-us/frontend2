import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routerConfig } from './router.config';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { Suspense } from 'react';
import { PrivateRoute } from './components/PrivateRoute';

// Pages
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';



function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        <ChatProvider>
          <BrowserRouter {...routerConfig}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<StartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              
              {/* Fallback for unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
