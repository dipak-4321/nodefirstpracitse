const express = require("express")
const fs = require("fs")
const path = require("path")
const root = __dirname

const app = express()
app.listen(8080,()=>console.log("server is running at port 8080"))


app.use(express.json())

app.post("/signup",(req,res)=>{
    const userdata = req.body
    const location = path.join(root,"files","users.json")
    const users = JSON.parse(fs.readFileSync(location,"utf-8"))
    const isUser = users.some((user)=>user.gmail === userdata.gmail)
    if(!isUser){
        users.push(userdata)
        fs.writeFileSync(location,JSON.stringify(users,null,2))
        res.status(200).send("signup completed")
    }else {
        res.status(409).send("User already exist")
    }

})

app.post("/login",(req, res)=>{
    const userdata  = req.body
    const location = path.join(root,"files","users.json")
    const users = JSON.parse(fs.readFileSync(location,"utf-8"))
    const user = users.find((user)=>user.gmail === userdata.gmail)
    if(user){
        if(user.password === userdata.password){
            res.status(200).send("login sucessfull")

        }else{
           res.status(404).send("Incorrect password")
        }

    }else{
        res.status(404).send("User not found")

    }

})