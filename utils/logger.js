require("dotenv").config()
const ws = require("winston")

function getLogger(){
  return ws.createLogger({
    transports: [
      new ws.transport.File({filename: process.env.LOGPATH}),
      new ws.transports.Console()
    ]
  })
}
module.exports = {
  getLogger,
}
