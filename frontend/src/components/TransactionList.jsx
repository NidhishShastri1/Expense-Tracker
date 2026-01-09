import React from 'react';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { deleteTransaction } from '../api/transactions';

const TransactionList = ({ transactions, onViewRefresh }) => {

    const handleDelete = async (id) => {
        if (window.confirm('Delete this transaction?')) {
            try {
                await deleteTransaction(id);
                if (onViewRefresh) onViewRefresh();
            } catch (error) {
                console.error("Failed to delete", error);
                alert("Failed to delete");
            }
        }
    };

    if (!transactions || transactions.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p className="text-secondary">No transactions found.</p>
            </div>
        )
    }

    return (
        <div className="card">
            <h3 className="text-lg font-bold" style={{ marginBottom: '1rem' }}>History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {transactions.map(t => (
                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)', borderLeft: `4px solid ${t.type === 'INCOME' ? 'var(--success)' : 'var(--danger)'}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {t.type === 'INCOME' ? <ArrowUpCircle className="text-success" /> : <ArrowDownCircle className="text-danger" />}
                            <div>
                                <p className="font-bold">{t.category}</p>
                                <p className="text-sm text-secondary">{t.note}</p>
                                <p className="text-sm text-secondary" style={{ fontSize: '0.75rem' }}>{t.date}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span className={t.type === 'INCOME' ? 'text-success font-bold' : 'text-danger font-bold'} style={{ fontSize: '1.1rem' }}>
                                {t.type === 'INCOME' ? '+' : '-'}${t.amount}
                            </span>
                            <button onClick={() => handleDelete(t.id)} className="btn btn-ghost" style={{ padding: '0.25rem', color: 'var(--text-secondary)' }}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
