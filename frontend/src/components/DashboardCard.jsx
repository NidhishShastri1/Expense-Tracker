import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const DashboardCard = ({ title, amount, type }) => {
    let Icon = Wallet;
    let gradient = 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 41, 59, 0) 100%)';
    let iconColor = '#3b82f6';
    let formattedAmount = amount ? amount.toFixed(2) : '0.00';

    if (type === 'INCOME') {
        Icon = TrendingUp;
        gradient = 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(30, 41, 59, 0) 100%)';
        iconColor = '#22c55e';
    } else if (type === 'EXPENSE') {
        Icon = TrendingDown;
        gradient = 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(30, 41, 59, 0) 100%)';
        iconColor = '#ef4444';
    }

    return (
        <div className="card" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            background: gradient,
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(12px)'
        }}>
            <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                padding: '1rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                <Icon color={iconColor} size={28} />
            </div>
            <div>
                <p className="text-secondary text-sm" style={{ marginBottom: '0.25rem', fontWeight: 500 }}>{title}</p>
                <h3 className="text-2xl font-bold" style={{ letterSpacing: '-0.5px' }}>${formattedAmount}</h3>
            </div>
        </div>
    );
};

export default DashboardCard;
