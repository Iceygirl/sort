
// 使用node创建http服务器


let http = require('http')
let url = require('url')


var server = http.createServer()
server.listen(8888)

// 上述代码只会启动一个监听8089的服务器，没有做应答，无意义



// 创建并监听端口
http.createServer(function(req, res) {
    console.log(url.parse(req.url))


    // console.log('get request')
    // 这里会输出两次get request，原因是会请求favicon.ico



    res.writeHead(200, {"Content-Type": "text/plain"})
    res.write("Hello World")
    // response.writeHead发送一个请求状态码和内容类型，使用 response.write() 函数在HTTP响应主体中发送文本“Hello World"



    res.end()
    // 告诉服务器，所有的响应头和响应体已经发送，服务器可以认为消息结束

  }).listen(8089)

console.log('Serve running at http://localhost:8089')



/*
 *服务器端运行：指定目录下运行node server.js
 *客户端刷新：curl http://localhost:8089/demo/test
 */




//  ----------------------------------------------------------------------------



let HTTP = require('http')
let URL = require('url')
let QueryString = require('querystring')

HTTP.createServer((req,res)=>{

    let pathUrl = URL.parse(req.url)
    // let query = QueryString.parse(pathUrl.query)

    // 根据路由判断
    if(pathUrl.pathname === '/get') {
        res.writeHead(200,{'content-type':'text/plain'})
        res.write('hello node')
        res.end()

    } else if(pathUrl.pathname === '/post') {

        console.log('发送post请求')

        let postData = QueryString.stringify({
            msg:'hello node'
        })

        let options = {
            hostname:'localhost',
            port:8089,
            path:'/test',
            method:'post',
            headers:{
                'content-type':'text-plain'
            }
        }


        let postReq =  HTTP.request(options)
        postReq.write(postData)
        postReq.end()
        

    } else if(pathUrl.pathname === '/test') {
        
        let jsonData = ''
        req.on('data',(data)=>{
            jsonData += data
            console.log('接收数据中...')
        })

        req.on('end',()=>{
            console.log('接收完成')
            console.log(QueryString.parse(jsonData))
        })
    }



}).listen(8089)

console.log('node服务已启动')