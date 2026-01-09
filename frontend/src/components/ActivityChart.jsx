import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityChart = ({ transactions }) => {
    const dataByDate = transactions.reduce((acc, curr) => {
        const date = curr.date;
        if (!acc[date]) {
            acc[date] = { date, income: 0, expense: 0 };
        }
        if (curr.type === 'INCOME') {
            acc[date].income += curr.amount;
        } else {
            acc[date].expense += curr.amount;
        }
        return acc;
    }, {});

    const chartData = Object.values(dataByDate).sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="card" style={{ height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="text-lg font-bold" style={{ marginBottom: '1rem' }}>Activity Trend</h3>
            <div style={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#f8fafc' }}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                        <Area type="monotone" dataKey="income" stroke="#22c55e" fillOpacity={1} fill="url(#colorIncome)" />
                        <Area type="monotone" dataKey="expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ActivityChart;
