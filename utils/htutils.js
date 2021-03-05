const http = require("http")
const https = require("https")
const logger = require("./logger.js").getLogger
const fs = require("fs")
const url = require("url")
const crypto = require("crypto")
const errCollection = require("./error.js")
const DownloadMeta = require("./meta.js").DownloadMeta

//patchink
if(Array.prototype.last === undefined){
  Array.prototype.last = function(){
    return this[this.length-1]
  }
}













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
        const length = res.headers["content-length"]
        let meta = new DownloadMeta(uri, fpath, length)
        fs.open(fpath, "w", function(err, fd){
          if(err)
            reject(err)
          else{
            res.on("end", function(){
              fs.close(fd, function(err){
                reject({success: true, error: err})
              })
              resolve({success: true, error: false})
            })
            
            res.on("data", function(chunk){
              meta.chunkUpdate(chunk)
              fs.write(fd, chunk, 0, null, function(err, written, buffer){
                if(err)
                  reject({success: false, error: err})
              })
            })
            
            res.on("error", function(err){
              reject({success: false, error: err})
            })
          
          }
        })
      })
    }
  })
}




function main(){
  let uri = "https://download.mp3oops.fun/e/Dua-Lipa-Want-To.mp3"
  download(uri, "want.mp3").then(console.log).catch(console.log)
}

main()
