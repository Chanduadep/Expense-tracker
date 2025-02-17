import express from "express"
import { addExpenses,getExpenses,updateExpense,deleteExpense } from "../controllers/expense_controller.js"
import auth from "../middleware/auth_middleware.js"

const expenseRouter=express.Router()

expenseRouter.get('/allexpenses',getExpenses)
expenseRouter.post("/addexpense",auth,addExpenses)
expenseRouter.put('/update/:id',auth,updateExpense)
expenseRouter.delete('/delete/:id',auth,deleteExpense)

export default expenseRouter


