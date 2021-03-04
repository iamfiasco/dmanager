const crypto = require("crypto")

function meta(uri, fpath, name){
  //data members
  this.filename = name
  this.fpath = fpath
  this.name = name

  //data methods
  this.hash = function(){
    var res = crypto.createHash("md5")
    res.update(this.uri+this.fpath+this.name)
    return res.digest()
  }
}

module.exports = {
  meta
}
