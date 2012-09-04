// 通过feedparser抽取新闻列表所需数据
var fs = require('fs');
var FeedParser = require('feedparser')
  , parser = new FeedParser();

function start(res, channelPath){
  //parser.parseFile('http://10.21.24.84:8021/rss.aspx?path=/News/zzxw/xwzx/tpxw', myCallback);
  var url = 'http://10.21.24.84:8021/rss.aspx?path=' + channelPath;
  console.log(url);
  parser.parseFile(url, myCallback);
  function myCallback (error, meta, articles){
    var channel, view = {};
    var items =[];
      if (error) console.error(error);
      else {
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
      //异步写文件
      fs.writeFile('source.json', JSON.stringify(view), function (err, data) {
        if(err) throw err;
        console.log("source.txt saved.");
      });
      console.log('end');
      res.send(JSON.stringify(view));
      }
    }
}

exports.start = start;