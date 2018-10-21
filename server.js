const net = require('net');
const elements = require('./elements');

const PORT = process.env.PORT || 8080;
console.log(PORT)
const server = net.createServer((socketRequest) => {
  //socket connection request code goes here process request here
  socketRequest.setEncoding('utf8');

  socketRequest.on('data', (data) => {
    //process request and response here
    let dataParts = data.split(/\r\n|\r|\n/);
    console.log(data)
    let head = dataParts[0].split(' ')

    let response = "";
    response = response.concat(`HTTP/1.1 200 OK\n`)
    response = response.concat(`Content-Type: text/html\n`)
    response = response.concat(`\n`)

    if (head[1] === '/hydrogen' || head[1] === '/hydrogen.html') {
      response = response.concat(elements.hydrogen);
      socketRequest.write(response);
    } else if (head[1] === '/helium' || head[1] === '/helium.html') {
      response = response.concat(elements.helium);
      socketRequest.write(response);
    } else if (head[1] === '/' || head[1] === '/index') {
      response = response.concat(elements.index);
      socketRequest.write(response);
    } else if (head[1] == '/css/styles.css') {
      let cssResp = "";
      cssResp = cssResp.concat(`HTTP/1.1 200 OK\n`)
      cssResp = cssResp.concat(`Content-Type: text/css\n`)
      cssResp = cssResp.concat(`\n`)
      cssResp = cssResp.concat(elements.styles)
      socketRequest.write(cssResp)
    } else {
      response = response.concat(elements._404);
      socketRequest.write(response);
    }

    socketRequest.end();//final step
  })
  socketRequest.on('end', () => {
  });
});
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
})