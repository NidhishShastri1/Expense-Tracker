import api from './axiosConfig';

export const getTransactions = async () => {
    const response = await api.get('/transactions/me');
    return response.data;
};

export const addTransaction = async (transaction) => {
    const response = await api.post('/transactions', transaction);
    return response.data;
};

export const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`);
};
