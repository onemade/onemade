var readability = require('node-readability')
  , fs = require('fs')
  , http = require('http')
  , url = require('url');

var data = {};
function start(res, url){
  //res.send("/* package.readability */");
  // uncoment the following line to print the debug info to console.
  // readability.debug(true);
  //var url = 'http://www.cnpc.com.cn/News/zzxw/xwzx/xwygg/201208/20120809_C5188.shtml';
  //url ='http://news.cnpc.com.cn/system/2012/08/09/001387065.shtml';
  //url ='http://www.cnbeta.com/articles/202195.htm';

  var domin = url.match(/http:\/\/[^/]+/ig);
  console.log(url);
  console.log(domin);

  readability.read(url, function(err, read) {
    var dom = read.getDocument();
    var content = read.getContent();

    //替换相对路径 图片等
    content = content.replace(/src=(['"]?)(?!http:\/\/)([^'"\s>]+)/ig, "src=$1"+domin+"/$2")

    var data    = {};
    data.title  = dom.title;  //标题
    data.url    = url;        //链接
    data.content   = content;       //内容
    
    console.log(JSON.stringify(data));
    res.send(data);
  });
}
exports.start = start;
