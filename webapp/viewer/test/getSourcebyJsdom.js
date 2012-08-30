var http = require('http');
var jsdom = require('jsdom');
var fs = require('fs');

jsdom.env("http://10.21.24.84:8021/rss.aspx?path=/News/zzxw/xwzx/tpxw",[
	"http://localhost:3000/javascripts/jquery.js"
],
function(errors, window){
	var $ = window.$;
	var content = $('body').html();
	content = content.replace('&lt;![CDATA[','');
	content = content.replace(']]&gt;','');
	$('body').html(content);

	//存储文件到 source.xml
	var content = $('body').html();
	var filename = 'source.txt';
	fs.writeFile(filename, content, function (err, data) {
		if(err) throw err;
		console.log("source.txt saved.");

	});

window.close(); //释放内存

/*
	var items = $("item");
	var itemList = [];
	for(var item in items)
	{
		//console.log($(item).find("pubDate").text());
		tmp = {};
		tmp.title = $(item).find("title").text();
		tmp.link = $(item).find("link").text();
		tmp.pubDate = $(item).find("pubDate").text();
		itemList.push(item);
	}
*/
/*
	$("item").each(
		function(i){
			console.log(i);
			//console.log($(this).text());
			//console.log($(this).find("link").text());
			//看来数据解析的终极解决方案还是正则啊！！！

			var item = $(this).find("description").html();
			//item = item.substring(/<link>.+<\/link\>/ig);
			console.log("=====================");
			console.log(item);
			console.log("=====================");
		}
	)
*/

	//console.log(itemList[0]);
	
	//console.log(content);

/*
	var itemList = [];
	var item = {};
	item.title = "title";
	item.link = "link";
	item.pubDate = "pubDate";
	itemList.push(item);
	console.log(itemList[0].title);
*/

}
);