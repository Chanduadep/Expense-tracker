import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import router from './routes/auth.js'
import expenseRouter  from './routes/expense_route.js'

const app=express()
app.use(cors({origin: 'http://localhost:3000', 
    credentials: true
  }))
app.use(express.json())
dotenv.config()

app.use('/api/auth',router)
app.use('/api/expenses',expenseRouter)
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});
mongoose.connect(process.env.MONGODBURL)
.then(()=>console.log("mongodb is connected"))


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT} `); 
})

