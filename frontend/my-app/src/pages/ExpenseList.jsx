import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ExpenseItem from './ExpenseItem';
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view expenses');
        setLoading(false);
        return;
      }
      const res = await api.get('/expenses/allexpenses');
      setExpenses(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch expenses');
      setLoading(false);
    }
};

  const handleExpenseDeleted = (expenseId) => {
    setExpenses(expenses.filter(expense => expense._id !== expenseId));
  };

  const handleExpenseUpdated = (expenseId, updatedExpense) => {
    setExpenses(expenses.map(expense => 
        expense._id === expenseId ? updatedExpense : expense
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div >
      {expenses.map(expense => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          onDelete={handleExpenseDeleted}
          onUpdate={handleExpenseUpdated}  
        />
      ))}
    </div>
  );
};

export default ExpenseList;