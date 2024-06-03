import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Navigation from './components/Navigation';
import SearchPage from './components/SearchPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/auth" element={isLoggedIn ? <Navigate to="/" /> : <AuthPage onLogin={handleLogin} />} />
          <Route path='/' element={<SearchPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
