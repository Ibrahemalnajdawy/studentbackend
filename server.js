const express = require('express')
const Mongoose = require('mongoose')
const cors = require('cors')
 require('dotenv').config()
 const app = express()
 //midleware
 app.use(express.json())
 app.use(cors())
 const connectDB = async ()=>{
   try {
        await Mongoose.connect(process.env.DB_CONN)
console.log("database connected")
   } catch (error) {
    console.log(error.message())
   }

 }

 
 connectDB()
 const studentScema = new Mongoose.Schema({
    name: String,
    email:String
 })
 const Student =Mongoose.model("student",studentScema)

//API's


//insert student
app.post("/students",async (req,res)=>{
    const student = new Student(req.body)
await student.save()
res.json(student)
})
//read student
app.get("/students", async (req,res)=>{
    const students = await Student.find()
    res.json(students)
})
//update
app.put("/students/:id",async (req,res)=>{
    const student=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.json(student)
})
//delete
app.delete("/students/:id",async (req,res)=>{
    const student=await Student.findByIdAndDelete(req.params.id.body,{new:true})
res.json({message:"Student Deleted"})
})

 app.listen(process.env.DB_CONN,()=> console.log("server connected"))