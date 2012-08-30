var fs = require("fs");

fs.readFile("source.txt","utf-8", function (err, data) {
	if(err) throw err;
	//console.log(data);
	//console.log("end!");
	var content = data;
	content = content.replace(/<link \/>/ig,'');
	//var channel = content.match(/<channel(.|\n)*channel>/ig)[0];
	var regex = /<title>.+<\/title>/ig;
	//regex = /<link>.+<\/link>/ig;
	//regex = /<(.*)>.*<\/>|<(.*)\/>/ig;
	//regex = /<item>.*<.+item/ig;
	tmp = content.match(regex);
	console.log("==================");
	console.log(tmp[0]);
	console.log("==================");

	//console.log(channel);
});