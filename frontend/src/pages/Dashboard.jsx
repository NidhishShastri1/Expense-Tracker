import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import TransactionList from '../components/TransactionList';
import ActivityChart from '../components/ActivityChart';
import CategoryChart from '../components/CategoryChart';
import { getTransactions } from '../api/transactions';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await getTransactions();
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransactions(sorted);

            // Calculate stats
            const income = data.filter(t => t.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
            const expense = data.filter(t => t.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);
            setStats({ income, expense, balance: income - expense });

        } catch (error) {
            console.error("Failed to fetch transactions", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <header>
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p className="text-secondary">Overview of your finances</p>
            </header>

            {/* Top Section: Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
                {/* Activity Chart */}
                <div style={{ minHeight: '350px' }}>
                    <ActivityChart transactions={transactions} />
                </div>
                {/* Category Chart */}
                <div style={{ minHeight: '350px' }}>
                    <CategoryChart transactions={transactions} />
                </div>
            </div>

            {/* Bottom Section: Summary & History */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>

                {/* Summary Cards - Vertical Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <DashboardCard title="Total Balance" amount={stats.balance} />
                    <DashboardCard title="Total Income" amount={stats.income} type="INCOME" />
                    <DashboardCard title="Total Expenses" amount={stats.expense} type="EXPENSE" />
                </div>

                {/* Recent Transactions */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 className="text-lg font-bold">Recent Transactions</h3>
                        <Link to="/transactions" className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>View All <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} /></Link>
                    </div>
                    {loading ? <p>Loading...</p> : <TransactionList transactions={transactions.slice(0, 5)} onViewRefresh={fetchTransactions} />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
