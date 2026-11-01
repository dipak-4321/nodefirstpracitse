const http = require("http")
const fs = require("fs")
const server = http.createServer((req , res)=>{
    
    if(req.url === '/'){
        const ui = fs.readFileSync("ui/index.html" ,"utf-8")
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(ui)
        
    }else if(req.url === '/login'){
        const ui = fs.readFileSync("ui/login.html", "utf-8")
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(ui)
    }else {
        const ui = fs.readFileSync("ui/error.html", "utf-8")
        res.writeHead(404, {'Content-Type':'text/html'})
         res.end(ui)
    }

})

server.listen(8080,()=>console.log('running'))