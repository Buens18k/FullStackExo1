const http = require('http');

const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}
// Utilise la fonction 'normalizePort' qui renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaine de caractère
const port = normalizePort(process.env.PORT || '3000')

app.set('port', port)

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'requires eleveted privileges.')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
    default:
      throw error
  }
}

const server = http.createServer(app);
// Écouteur d'évenement consignant le port ou le canal nommé sur lequel le serveur s'éxécute dans la console
server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port
  console.log('Listening on ' + bind)
})

server.listen(port);