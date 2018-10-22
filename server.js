const net = require('net');
const elements = require('./elements');

const PORT = process.env.PORT || 8080;
const server = net.createServer((socketRequest) => {
  //socket connection request code goes here process request here
  socketRequest.setEncoding('utf8');

  socketRequest.on('data', (data) => {
    //process request and response here
    let dataParts = data.split('\r\n');
    let reqHead = dataParts[0].split(' ');
    let reqUri = reqHead[1].toLowerCase();

    let response = "";
    response = response.concat(`HTTP/1.1 200 OK\n`);
    response = response.concat(`Content-Type: text/html\n`);
    response = response.concat(`\n`);

    if (reqUri === '/hydrogen' || reqUri === '/hydrogen.html') {
      response = response.concat(elements.hydrogen);
      socketRequest.write(response);
    } else if (reqUri === '/helium' || reqUri === '/helium.html') {
      response = response.concat(elements.helium);
      socketRequest.write(response);
    } else if (reqUri === '/' || reqUri === '/index' || reqUri === '/index.html') {
      response = response.concat(elements.index);
      socketRequest.write(response);
    } else if (reqUri == '/css/styles.css') {
      let cssResp = "";
      cssResp = cssResp.concat(`HTTP/1.1 200 OK\n`);
      cssResp = cssResp.concat(`Content-Type: text/css\n`);
      cssResp = cssResp.concat(`\n`);
      cssResp = cssResp.concat(elements.styles);
      socketRequest.write(cssResp);//can create a function for response
    } else {
      let errorMessage = '';
      errorMessage = errorMessage.concat(`HTTP/1.1 404 ERROR\n`);
      errorMessage = errorMessage.concat(`Content-Text: text/html\n`);
      errorMessage = errorMessage.concat(`\n`);
      errorMessage = errorMessage.concat(elements._404);
      socketRequest.write(errorMessage);
    }

    socketRequest.end();//final step
  })
  socketRequest.on('end', () => {
    console.log(`disconnected`)
  });
});
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
});