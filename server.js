const net = require('net');

const PORT = process.env.PORT || 8080;

const server = net.createServer((socketRequest)=>{
console.log('client connected');
});
//socket connection request

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})