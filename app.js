const express = require ("express")
// const { Server } = require("http")
const http  = require("http")
const path = require ("path")

const SocketIO = require("socket.io")

const app = express ()

const Server = http.createServer (app)

const io = SocketIO(Server)


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())


let socketsConnected = new Set()


// io.on("connection", (socket)=>{
//   console.log('User connected', socket.id)
//   socketsConnected.add(socket.id)
//   io.emit ('client-total', socketsConnected.size);

io.on('connection', onConnected)

function onConnected(socket){
  console.log('user connected', socket.id)
  socketsConnected.add(socket.id)
  io.emit ('clients-total', socketsConnected.size);

  socket.on('disconnect', ()=>{
        console.log('Socket disconnected', socket.id)
        socketsConnected.delete(socket.id)
        io.emit ('clients-total', socketsConnected.size)
      })

      socket.on('message', (data)=>{
        // console.log(socket.id, data)
        socket.broadcast.emit('message', data)
      })

      socket.on('feedback', (data)=>{
        socket.broadcast.emit('feedback', data)
      })
}
  











module.exports = Server

