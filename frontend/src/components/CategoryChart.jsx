import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899'];

const CategoryChart = ({ transactions }) => {
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
        <div className="card" style={{ height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="text-lg font-bold" style={{ marginBottom: '1rem' }}>Category Breakdown</h3>
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
    );
};

export default CategoryChart;
