import React, { useEffect } from 'react';
import { seedDatabase } from './services/mockDb';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CaravanDetail from './pages/CaravanDetail';
import Dashboard from './pages/Dashboard';

function App() {
  useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="caravan/:id" element={<CaravanDetail />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
