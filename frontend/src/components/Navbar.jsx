import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Receipt, LogOut, Zap } from 'lucide-react';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 10, padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>FINTRACK</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/dashboard" className="btn btn-ghost" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        <Link to="/transactions" className="btn btn-ghost" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Receipt size={18} /> Transactions
                        </Link>
                        <Link to="/about" className="btn btn-ghost" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Zap size={18} /> About
                        </Link>
                    </div>
                </div>

                <button onClick={handleLogout} className="btn btn-ghost" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
