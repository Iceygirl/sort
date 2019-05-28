
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




// ----------------------------------------------------------------------



// 格式化url
console.log(url.parse(req.url,true))


// 结果：
// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=s&oq=%25E5%2593%2588%25E5%2593%2588&rsv_pq=cd83ac0300108bde&rsv_t=2c0bGt%2Bdu40JUQs7lghyZpClR04efFgjha39Y4WvQfz1PX%2FJ05U8n9E8ZGU&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=5&rsv_sug7=101&rsv_sug2=0&inputT=1739&rsv_sug4=1740',
//     query:
//      { ie: 'utf-8',
//        f: '8',
//        rsv_bp: '1',
//        rsv_idx: '1',
//        tn: 'baidu',
//        wd: 's',
//        oq: '%E5%93%88%E5%93%88',
//        rsv_pq: 'cd83ac0300108bde',
//        rsv_t: '2c0bGt+du40JUQs7lghyZpClR04efFgjha39Y4WvQfz1PX/J05U8n9E8ZGU',
//        rqlang: 'cn',
//        rsv_enter: '1',
//        rsv_sug3: '4',
//        rsv_sug1: '5',
//        rsv_sug7: '101',
//        rsv_sug2: '0',
//        inputT: '1739',
//        rsv_sug4: '1740' },
//     pathname: '/',
//     path: '/?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=s&oq=%25E5%2593%2588%25E5%2593%2588&rsv_pq=cd83ac0300108bde&rsv_t=2c0bGt%2Bdu40JUQs7lghyZpClR04efFgjha39Y4WvQfz1PX%2FJ05U8n9E8ZGU&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=5&rsv_sug7=101&rsv_sug2=0&inputT=1739&rsv_sug4=1740',
//     href: '/?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=s&oq=%25E5%2593%2588%25E5%2593%2588&rsv_pq=cd83ac0300108bde&rsv_t=2c0bGt%2Bdu40JUQs7lghyZpClR04efFgjha39Y4WvQfz1PX%2FJ05U8n9E8ZGU&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=5&rsv_sug7=101&rsv_sug2=0&inputT=1739&rsv_sug4=1740' }


// ---------------------------------------------------------------------------------


// 例子：模仿wamp，直接将文件放在www中，根据路由读取文件

let http = require('http')
let url = require('url')
let fs = require('fs')


http.createServer((req,res)=>{
    fs.readFile(`www${req.url}`,(err, data)=>{
        if(err) {
            res.write('404')
        } else {
            res.write(data)
        }
        res.end()
    })

    // res.end() 报错：Error: write after end,因为fs.readFile是异步操作，不会等他，先执行后面的end()就会造成错误
}).listen(8089)

console.log('node服务已启动')



