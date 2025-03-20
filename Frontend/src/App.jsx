import { useState } from 'react';
import { authClient } from './lib/auth-client';
import { Routes,Route,Navigate } from 'react-router-dom';
import Auth from './pages/AuthPage';
import Dashboard from './pages/DashBoard/Dashboard';

function App() {
  const { data, isPending, error } = authClient.useSession();

  // to show loading while fetching session
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Routes>
     
      <Route path="/" element={data?.user ? <Navigate to="/dashboard" replace /> : <Auth />} />
      <Route path="/dashboard" element={data?.user ? <Dashboard /> : <Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;