import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="about" element={<About />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
