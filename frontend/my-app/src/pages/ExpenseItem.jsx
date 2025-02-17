
import React, { useState } from 'react';
import api from '../utils/api';

const ExpenseItem = ({ expense, onDelete, onUpdate }) => { 
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    expenseName: expense.expenseName,
    description: expense.description,
    amount: expense.amount
  });

  const handleDelete = async () => {
    try {
      await api.delete(`/expenses/delete/${expense._id}`);
      onDelete(expense._id);
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await api.put(`/expenses/update/${expense._id}`, editData);
      setIsEditing(false);
      onUpdate(expense._id, response.data); 
    } catch (err) {
      console.error('Failed to update course:', err);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div >
      {isEditing ? (
        <div>
          <input
            type="text"
            name="expenseName"
            value={editData.expenseName}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="amount"
            value={editData.amount}
            onChange={handleChange}
          />
          <div>
            <button
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 >{expense.expenseName}</h3>
          <p >{expense.description}</p>
          <p > {expense.amount}</p>
          <div >
            <button
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseItem;