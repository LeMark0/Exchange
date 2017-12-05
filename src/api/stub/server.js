/**
 *
 * Run the server to use stubs
 */
const { port } = require('../stubServerConfig');

const connect = require('connect');
const serveStatic = require('serve-static');

connect()
  .use(serveStatic(__dirname, {
    setHeaders(res) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    },
  }))
  .listen(port, () => {
    console.log(`Server running on ${port}...`);
  });
