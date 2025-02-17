import mongoose from "mongoose"

const expenseSchema=new mongoose.Schema({
    expenseName:{type:String ,required:true},
    amount:{type:String,required:true},
    description:{type:String,required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt:{type:Date,default:Date.now()}
})

const Expense=new mongoose.model("Expense",expenseSchema)

export default Expense