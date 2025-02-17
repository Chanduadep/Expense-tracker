import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpensesForm from './ExpensesForm';

const AddExpensesForm = () => {
  console.log('Rendering AddCoursePage'); 
  const navigate = useNavigate();

  const handleExpensesAdded = (newExpense) => {
    console.log('Expense  added:', newExpense); 
    navigate('/ExpenseList');
  };

  return (
    <div>
    <h1>Add New Expense</h1>
    <ExpensesForm onExpensesAdded={handleExpensesAdded} />
  </div>
  );
};

export default AddExpensesForm;