const express = require('express')
const socketio = require('socket.io')
const http = require("http")
const app = express()
const path = require("path")
const server = http.createServer(app)

const io = socketio(server);

io.on("connection",async(socket)=>{

    console.log("connected")
   
   
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{
            id : socket.id,
            ...data,
        })
    })

    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
    })

})




app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(3000);