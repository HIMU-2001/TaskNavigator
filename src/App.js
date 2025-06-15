import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import Dashboard from './pages/Dashboard/Dashboard';;

function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/developer-dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
