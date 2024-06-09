import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Navigation from './components/Navigation';
import SearchPage from './components/SearchPage';
import SchedulePage from './components/SchedulePage';
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username')
    setIsLoggedIn(false);
  };

  const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/auth" />;
  };
  
  const AuthRoute = ({ isLoggedIn, children }) => {
    return !isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <div>
        <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/auth" element={
              <AuthRoute isLoggedIn={isLoggedIn}>
                <AuthPage onLogin={handleLogin} />
              </AuthRoute>
            }
          />
          <Route path="/" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route path="/schedule/:trainNumber" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SchedulePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
