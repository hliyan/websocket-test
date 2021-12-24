const {WebSocketServer} = require('ws');

const server = new WebSocketServer({port: 8080});

server.on('connection', (sock) => {
  console.log('New connection');

  sock.on('message', (buf) => {
    const data = buf.toString();
    switch (data) {
      case 'exit':
      case 'quit':
      case 'bye':
       sock.close(); 
       return;
      break;
      default:
        sock.send('echo ' + data);
      break;
    }
  });

  sock.on('close', () => {
    console.log('client disconnected');
  });

  sock.onerror = (err) => {
    console.log('error');
    console.log(err);
  };
});

console.log('server running');
