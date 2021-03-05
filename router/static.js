const express = require("express")
const router = express.Router()


router.get("/ping", function(req, res){
  res.render("ping")
})

module.exports = {
  staticRouter: router
}
