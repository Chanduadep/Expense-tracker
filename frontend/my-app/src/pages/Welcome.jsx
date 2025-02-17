import React from 'react'
import "../styles/expense.css"

const Welcome = () => {
  return (
    <div className="welcome-container">
    <h1>Welcome to Expense Tracker</h1>
    <a href="/ExpensesForm"><p>Add Expenses</p></a>
    <a href='/expenses'><p>Expenses List</p></a>
    </div>
    
  )
}

export default Welcome