import Expense from "../models/expense.js"

export const addExpenses= async (req,res)=>{
    try{
        const {expenseName,amount,description}=req.body
        const expense=new Expense({
            expenseName,
            amount,
            description,
            createdBy:req.user.id
        })
        await expense.save()
        return res.json(expense)
    }catch(err){
        return res.json({error:err.message,message:"server error"})
    }
}

export const getExpenses= async (req,res)=>{
    try{
        const expense=await Expense.find()
        return res.json(expense)
    }catch(err){
        return res.json({error:err.message,message:"server error"})
    }
}

export const updateExpense = async (req, res) => {
    try {
      const expense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!expense) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(expense);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  export const deleteExpense = async (req, res) => {
    try {
      const expense = await Expense.findByIdAndDelete(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json({ message: 'Course deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };