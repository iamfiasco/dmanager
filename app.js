require("dotenv").config()
const express = require("express")
const apiRouter = require("./router/api.js").apiRouter;
const staticRouter = require("./router/static.js").staticRouter
const path = require("path")
const app = express()

app.set("view engine", "pug")
app.set("views", path.join(process.env.VIEW_PATH))

app.use("/api", apiRouter)
app.use("/", staticRouter)

app.listen(3000, function(){
  console.log("api server running at 3000")
})
