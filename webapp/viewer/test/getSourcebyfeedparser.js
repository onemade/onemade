/*!
 * node-feedparser
 * Copyright(c) 2011 Dan MacTough <danmactough@gmail.com>
 * MIT Licensed
 */
var fs = require('fs');
var FeedParser = require('feedparser')
  , parser = new FeedParser();
/*
parser.on('article', function(article){
    console.log('Got article: %s', JSON.stringify(article));
    content = JSON.stringify(article);
*/
    /*
    fs.writeFile('source.json',  JSON.stringify(article), 'utf-8', function (err, data) {
		  if(err) throw err;
		  console.log("source.txt saved.");

	   });
	*/
/*
	fs.writeFileSync('source.json', content);
	console.log('source.json saved');
	console.log('end');

});
*/

//parser.parseFile('http://10.21.24.84:8021/rss.aspx?path=/News/zzxw/xwzx/tpxw', myCallback);
parser.parseFile('rss.aspx', myCallback);

function myCallback (error, meta, articles){

  var channel, view = {};
  var items =[];

      if (error) console.error(error);
      else {
        //console.log('Feed info');
        //console.log('%s - %s - %s', meta.title, meta.link, meta.xmlUrl);
        //console.log('Articles');

        channel = meta.title;
        articles.forEach(function (article){
          //console.log('%s - %s (%s)', article.date, article.title, article.link);
          var item = {};
          item.title = article.title;
          item.link = article.link;
          item.pubDate = article.date;
          items.push(item);
          //console.log(article.description);
          //imgsrc = getImage(article.description);
        });
      
      view.channel = channel;
      view.items = items;
      /*
      //同步写文件
      fs.writeFileSync('source.json', JSON.stringify(view));
      */
      ///*
      //异步写文件
      fs.writeFile('source.json', JSON.stringify(view), function (err, data) {
        if(err) throw err;
        console.log("source.txt saved.");
      });
      //*/
      //console.log(view);
      console.log('end');

      }
    }

//从str中提取图片链接
function getImage(str)
{
  var regex = /<img.*\/>/ig;
  var tmp = str.match(regex);
  //console.log('#%s#', tmp);
  return tmp;
}


