const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

const root = __dirname

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.listen(8080,()=>console.log('server is running'))

app.get("/",(req,res)=>{
    const query = req.query
    console.log(query.filename ,req.query.filename)
    const location = path.join(root,"files",query.filename)
    const isFile = fs.existsSync(location)
    if(isFile){
        const data =fs.readFileSync(location,"utf-8")
        res.status(200).send(data)
    }else{
        res.status(404).send("File not found")
    }

})

app.post("/",(req,res)=>{
    const data = req.body
    console.log(data.filename)
    const location = path.join(root,"files",data.filename)
    const isFile = fs.existsSync(location)
    if(!isFile){
        fs.writeFileSync(location,data.content)
        res.status(200).send("file creation completed")
    }
    else{
        res.status(409).send("file already exists")
    }
    
})