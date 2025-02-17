
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login'
import Register from './auth/Register'
import { AuthProvider } from './context/AuthContext';
import Welcome from './pages/Welcome';
import ExpensesForm from './pages/ExpensesForm';
import ExpenseList from './pages/ExpenseList';
import ExpenseItem from './pages/ExpenseItem';
import AddExpensesForm from './pages/AddexpensesForm';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/ExpensesForm" element={<ExpensesForm />} />
        <Route path="/ExpenseList" element={<ExpenseList />} />
        <Route path="/ExpenseItem" element={<ExpenseItem />} />
        <Route path="/AddExpense" element={<AddExpensesForm />} />
        </Routes>
      
      </Router>
      </AuthProvider>
      
      
    </div>
  );
}

export default App;
