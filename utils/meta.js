const crypto = require("crypto")
const fs = require("fs")
const path = require("path")
const promisePool = require("@supercharge/promise-pool")
const download = require("./htutils.js").download

class DownloadMeta{
  constructor(uri, fpath, length){
    this.uri = uri
    this.fpath = fpath
    this.name = uri.split("/").last()
    

    this.state = 0
    this.length = length;
  }

  chunkUpdate(chunk){
    this.state += chunk.byteLength
  }

  get hashVal(){
    if(this._hash === undefined){
      let hash = crypto.createHash("md5")
      hash.update(this.uri+this.fpath)
      this._hash = hash.digest()
      return this._hash
    }
    else{
      return this._hash
    }
  }
  
  progress(){
    return (this.state / this.length) * 100
  }
}

class Meta{
  constructor(obj, type){
    if(type === "json"){
      this.tasks = fs.readFileSync(obj).toString()
    }
    else if(type === "links"){
      let links = fs.readFileSync(obj).toString().split("\n")
      this.tasks = []
      for(link of links){
        tasks.push_back({uri: link, fpath: this.getFpath(link)})
      }
    }
  }
  async start(){
    await promisePool
      .for(this.tasks)
      .withConcurrency(process.env.MAX_COROS)
      .process(async (task)=>{
        const res = await download(task.uri, this.fpath)
        console.log(task.uri, res)
      })
  }
  getFpath(link){
    return path.join(process.env.DOWNLOAD_PATH, link.split("/").last())
  }

}

function main(){
  let a = new Meta("links.txt", "links")
  a.start()
}


//module.exports = {
//  DownloadMeta,
//  Meta
//}
