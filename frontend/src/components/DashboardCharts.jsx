import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899'];

const DashboardCharts = ({ transactions }) => {
    // Process data for AreaChart (Income vs Expense over time)
    // Group by date
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

    // Sort by date and take last 7 days or all
    const chartData = Object.values(dataByDate).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Process data for PieChart (Expense by Category)
    const expenseByCategory = transactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((acc, curr) => {
            const cat = curr.category;
            if (!acc[cat]) {
                acc[cat] = 0;
            }
            acc[cat] += curr.amount;
            return acc;
        }, {});

    const pieData = Object.keys(expenseByCategory).map((key, index) => ({
        name: key,
        value: expenseByCategory[key]
    }));

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>

            {/* Area Chart */}
            <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
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

            {/* Pie Chart */}
            <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                <h3 className="text-lg font-bold" style={{ marginBottom: '1rem' }}>Expenses by Category</h3>
                <div style={{ flex: 1, position: 'relative' }}>
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                            No expense data
                        </div>
                    )}

                    {/* Legend overlay */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                        {pieData.map((entry, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span>{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCharts;
