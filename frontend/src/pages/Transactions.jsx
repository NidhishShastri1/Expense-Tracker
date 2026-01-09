import React, { useEffect, useState } from 'react';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { getTransactions } from '../api/transactions';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await getTransactions();
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setTransactions(sorted);
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
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
            <div style={{ gridColumn: '1 / -1' }}>
                <header>
                    <h2 className="text-xl font-bold">Transactions</h2>
                    <p className="text-secondary">Manage your income and expenses</p>
                </header>
            </div>

            {/* Form Section - Left Aligned */}
            <div>
                <TransactionForm onTransactionAdded={fetchTransactions} />
            </div>

            {/* List Section - Expanding */}
            <div>
                {loading ? <p>Loading...</p> : <TransactionList transactions={transactions} onViewRefresh={fetchTransactions} />}
            </div>
        </div>
    );
};

export default Transactions;
