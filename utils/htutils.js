const http = require("http")
const https = require("https")
const logger = require("./logger")
const fs = require("fs")
const url = require("url")
const errCollection = require("./error.js")

function getAdapterFromURI(uri){
  const parsedURI = url.parse(uri)
  if(parsedURI.protocol === "https:")
    return https
  else if(parsedURI.protocol === "http:")
    return http
  else
    logger.error(errCollection.errors.unsupportedURI())
    return false
}
function download(uri, fpath){
  return new Promise(function(resolve, reject){
    const adapter = getAdapterFromURI(uri)
    if(!adapter)
      reject(errCollection.errors.unsupportedURI)
    else{
      adapter.get(uri, function(res){
        const length
        res
      })
    }
  })
}
