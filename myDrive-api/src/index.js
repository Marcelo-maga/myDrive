import fs from 'fs'
import https from 'https'
import { Server } from 'socket.io'
import { logger } from './logger.js'
import env from './config/env.js'
import Routes from './routes.js'

const PORT = env.PORT

const localHostSSL = {
  key: fs.readFileSync('./certificates/key.pem'),
  cert: fs.readFileSync('./certificates/cert.pem'),
}

const routes = new Routes()
const server = https.createServer(
  localHostSSL,
  routes.hendler.bind(routes)
)

const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: false
  }
})

routes.setSocketInstance(io)
io.on("Connection", (socket) => logger.info(`Someone connect: ${socket.id}`))

const startServer = () => {
  const { address, port } = server.address()
  logger.info(`App running at https://${address}:${port}`)
}

server.listen(PORT, startServer)