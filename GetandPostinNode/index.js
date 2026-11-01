const http = require("http")
const fs = require("fs")
const path = require("path")

const url = require("url")

const root = __dirname

const server = http.createServer((req , res)=>{
    if(req.method === "POST"){
    let data = ""
    req.on("data",(chunks)=>{
        data  += chunks
     
    })
    req.on("end", ()=>{
        const payload = JSON.parse(data)
        console.log(payload.content)
        const location = path.join(root,payload.filename)
        const isFile =fs.existsSync(location)
        if(!isFile){
            fs.writeFileSync(location, payload.content)
             res.writeHead(200,{'content-type':'text/plain'})
             res.end("sucesss")            
        }else{
             res.writeHead(404,{'content-type':'text/plain'})
             res.end("failed")   

        }

        
    })

    }else if (req.method === 'GET'){
        const u = req.url
        const {query} = url.parse(u,true)
        const location = path.join(root,query.filename)
        const content = fs.readFileSync(location, "utf-8")
        const isFile = fs.existsSync(location)
        if(isFile){
        res.writeHead(200,{'content-type':'text/plain'})
        res.end(content)
        }else{
            res.writeHead(404, {'content-type':'text/plain'})
            res.end("file doesn't exist")

        }


    }
})
server.listen(4040,()=>console.log("Server is running"))
