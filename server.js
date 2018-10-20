const net = require('net');
const elements = require('./elements');


const PORT = process.env.PORT || 8080;

const server = net.createServer((socketRequest) => {
  //socket connection request code goes here process request here
  socketRequest.setEncoding('utf8');

  socketRequest.on('data', (data) => {
    //process request and response here

    let dataParts = data.split(/\r\n|\r|\n/);

    let head = dataParts[0].split(' ')
    console.log(head[1])

    let response = "";
    response = response.concat(`HTTP/1.1 200 OK\n`)
    response = response.concat(`Content-Type: text/html\n`)
    response = response.concat(`\n`)
    if (head[1] === '/hydrogen' || head[1] === '/hydrogen.html') {
      response = response.concat(elements.hydrogen);
    } else if (head[1] === '/helium' || head[1] === '/helium.html') {
      response = response.concat(elements.helium);
    } else if (head[1] === '/' || head[1] === '/index') {
      response = response.concat(elements.index);
    } else {
      response = response.concat(`HTTP/1.1 404 ERROR\n`)
      response = response.concat(elements._404);
    }
    if(/css/styles.css)
    socketRequest.write(response);
    
    
    
    socketRequest.end();//final step
  })
  
  socketRequest.on('end', () => {
    console.log('Client disconnect')
  });

});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
})