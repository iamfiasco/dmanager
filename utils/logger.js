require(".env").config()
const ws = require("winston")

const logger = ws.createLogger({
  transports: [
    new ws.transport.File({filename: process.env.LOGPATH}),
    new ws.transports.Console()
  ]
})

module.exports = {
  logger
}
