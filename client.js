const net = require('net');
//const eventEmitter = require('events');
const PORT = 8080;
const host = process.argv[2];

const getServer = net.createConnection(PORT, host,() =>{
console.log('Connected')

let date = new Date();
let rfcDate = date.toUTCString();
let uri = `/`;
let request = `GET ${uri} HTTP/1.1
Date: ${rfcDate}
Host: ${host}
User-Agent: Magic\r\n\r\n`;
if(request === null){
  getServer.write(`Please choose a URI to send to the host server`)
}

getServer.write(request)

getServer.on('data', (data)=>{
  console.log(data.toString());
  getServer.destroy()
})
})






// GET /hydrogen HTTP/1.1
// cache-control: no-cache
// Postman-Token: 753beb96-e679-44ee-87d5-877f6c3a3cb3
// User-Agent: PostmanRuntime/7.3.0
// Accept: */*
// Host: localhost:8080
// accept-encoding: gzip, deflate
// Connection: keep-alive
