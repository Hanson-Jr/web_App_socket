const Server = require ("socket.io")
const app = require("./app")


const dotenv = require("dotenv")
dotenv.config()



const Port = process.env.PORT

const HostName = process.env.HOSTNAME



 app.listen(Port, ()=>{
  console.log(`app running at http://${HostName}:${Port}`)
})










