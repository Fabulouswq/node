
// 搭建本地站点

var http = require ('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
//站点的根目录路径
var docRoot = 'G:/static';

//搭建本地服务器
var server = http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	
	var file = docRoot+pathname;
	fs.exists(file,function(exists){
		if(exists){
			switch (path.extname(file)) {
				case ".html":
					res.writeHead(200,{"Content-Type":"text/html"});
					break;
				case ".js":
					res.writeHead(200,{"Content-Type":"text/javascript"});
					break;
				case ".css":
					res.writeHead(200,{"Content-Type":"text/css"});
					break;
				case ".gif":
					res.writeHead(200,{"Content-Type":"image/gif"});
					break;
				case ".png":
					res.writeHead(200,{"Content-Type":"image/png"});
					break;
				case ".jpg":
					res.writeHead(200,{"Content-Type":"image/jpg"});
					break;
				default :
					res.writeHead(200,{"Content-Type":"application/octet-stream"});

			}
			fs.readFile(file,function(err,data){
				res.write(data);
				res.end();
			})
		}else{
			res.writeHeader('404',{
				'content-type':'text/html;charset="utf-8"'

			})
			res.write('<h1>404错误</h1><p>你要找的页面不存在</p>')
			res.end();
		}
	})
}).listen(8888);
console.log('server running at localhost:8888');