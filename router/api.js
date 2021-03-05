const express = require("express")
const jsonify = require("./jsonizer.js").stringify
const router = express.Router()



router.get("/", function(req, res){
  jsonify(req, res, {message: "welcome home", error: false})
})

router.get("/ping", function(req, res){
  jsonify(req, res, {message: "hello lets play some pong", error: false})
})

module.exports = {
  apiRouter: router
}
