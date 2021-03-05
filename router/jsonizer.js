function stringify(req, res, payload){
  res.setHeader("Content-Type", "application/json")
  const resp = JSON.stringify(payload)
  res.end(resp)
}

module.exports = {
  stringify
}
