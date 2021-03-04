function DmanErrs(){
  this._UNSUPP_URI = "URL protocol unsupported"
  this.unsupportedURI = function(){
    return this._UNSUPP_URI
  }
}



module.exports = {
  errors: new DmanErrs()
}
