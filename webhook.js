let http = require('http');
let crypto = require('crypto')

let SECRET = '123456'
function sign(body) {
  return 'sha1='+crypto.createHmac('sha1',SECRET).update(body).digest('hex')
}

let server = http.createServer((req, res) => {
  console.log(req.method, req.url)
  if (req.method == 'POST' && req.url == '/webhook') {

    let buffers = []
    req.on('data', buffer => {
      buffer.push(buffer)
    })
    req.on('end', () => {
      let body = Buffer.concat(buffers)
      let event = req.headers['x-gitHub-event']
      // github请求来的时候，要传递请求体body，另外还会传一个signature过来
      // 需要验证签名对不对
      let signature = req.headers['x-hub-signature']
      if (signature != sign(body)) {
        res.end("Now Allowed");
      }
    })

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ok:true}))
  } else {
    res.end('Not Found')
  }
})

server.listen(4000, () => {
  console.log('webhook服务已在4000端口启动!')
})