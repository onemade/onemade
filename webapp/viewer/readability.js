/*
var readability = require('../src/readability')
  , fs = require('fs')

// uncoment the following line to print the debug info to console.
 readability.debug(true);

readability.read('http://www.cnpc.com.cn/News/zzxw/xwzx/xwygg/201208/20120809_C5188.shtml',
function(err, read) {
  var dom = read.getDocument();
  var html = '<html><head><meta charset="utf-8"><title>'+dom.title+'</title></head><body><h1>'+read.getTitle()+'</h1>'+read.getContent()+'</body></html>';
  console.log(html);
});
*/
/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var content='这里是内容';
  res.end('Hello World\n');
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
*/

var readability = require('node-readability')
  , fs = require('fs')
  , http = require('http');

// uncoment the following line to print the debug info to console.
// readability.debug(true);
var url = 'http://www.cnpc.com.cn/News/zzxw/xwzx/xwygg/201208/20120809_C5188.shtml';
url ='http://news.cnpc.com.cn/system/2012/08/09/001387065.shtml';
var domin = url.match(/http:\/\/[^/]+/ig);
console.log(url);
console.log(domin);

readability.read(url,
function(err, read) {
  var dom = read.getDocument();
  var html = '<html><head><meta charset="utf-8"><title>'+dom.title+'</title></head><body><h1>'+read.getTitle()+'</h1>'+read.getContent()+'</body></html>';

  //html = html.replace(/^<img([^>]*)src=([^]*)\/>$/,"<img src='http://www.cnpc.com.cn/$2' />");
  //html = html.replace(/<img\s+src=(['"]?)(?!http:\/\/)([^'"\s>]+)/ig,"$1");
  html = html.replace(/src=(['"]?)(?!http:\/\/)([^'"\s>]+)/ig, "src=$1"+domin+"/$2")
  console.log(html);
  
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}).listen(4000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:4000/');

});
