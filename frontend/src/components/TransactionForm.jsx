import React, { useState } from 'react';
import { addTransaction } from '../api/transactions';
import { PlusCircle } from 'lucide-react';

const TransactionForm = ({ onTransactionAdded }) => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('EXPENSE');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addTransaction({
                amount: parseFloat(amount),
                type,
                category,
                note,
                date
            });
            setAmount('');
            setCategory('');
            setNote('');
            // Keep date as is or reset? Keep as is usually better for multiple entries.
            if (onTransactionAdded) onTransactionAdded();
        } catch (error) {
            console.error("Failed to add transaction", error);
            alert("Failed to add transaction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h3 className="text-lg font-bold" style={{ marginBottom: '1rem' }}>Add Transaction</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label className="text-sm text-secondary">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', color: 'white', border: '1px solid var(--glass-border)' }}
                        >
                            <option value="EXPENSE">Expense</option>
                            <option value="INCOME">Income</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-secondary">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', color: 'white', border: '1px solid var(--glass-border)' }}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label className="text-sm text-secondary">Category</label>
                        <input
                            type="text"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', color: 'white', border: '1px solid var(--glass-border)' }}
                            placeholder={type === 'EXPENSE' ? 'Food, Transport' : 'Salary, Freelance'}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-secondary">Date</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', color: 'white', border: '1px solid var(--glass-border)' }}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm text-secondary">Note (Optional)</label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', color: 'white', border: '1px solid var(--glass-border)' }}
                        placeholder="Details..."
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: 'center' }}>
                    <PlusCircle size={18} style={{ marginRight: '0.5rem' }} /> {loading ? 'Adding...' : 'Add Transaction'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
