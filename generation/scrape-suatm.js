var url = require('url')
var recheckBad = false;
var cleanup = function Cleanup(callback) {

  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  callback = callback || noOp;
  process.on('cleanup',callback);

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup');
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    console.log('Ctrl-C...');
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
  });
};

var http = require('follow-redirects').http;
http.globalAgent.maxSockets = 127;
  var fs = require('fs');

var names = [];
var all = [];

var all = require('./suatm.json');

//console.log(all.length);
//console.log(names.join("\n"))
//console.log(JSON.stringify(all));
var nextAllIterator = 0;
var removeNext = function() {
  var nextAll = nextAllIterator++;
  if(!all.hasOwnProperty(nextAll))
  	return;
  if(all[nextAll].hasOwnProperty("ASIN") || (!recheckBad && all[nextAll].hasOwnProperty("bad"))) {
    nextAllIterator;
    setTimeout(removeNext,0);
    console.log(all[nextAll].title + " has ASIN: "+all[nextAll].ASIN); 
    return;
  } 
  if(all[nextAll].url.indexOf("amazon.com") > 0) {
        all[nextAll].ASIN = all[nextAll].url.match("/([a-zA-Z0-9]{10})(?:[/?]|$)")[0].replace(/\W/g, '')
        delete all[nextAll].url;
        console.log(all[nextAll]);
        if(nextAllIterator < all.length)
          setTimeout(removeNext, 0);
        return;
  }

  var theURL = all[nextAll].url;
    console.log(all[nextAll].title+ ": " + theURL);
try {
  //console.log("TEST");

  var options = url.parse(theURL);
  //console.log("TEST");
  //console.log(options);
  options.maxRedirects = 10;
  var request = http.get(options, function (res) {
    res.on('finish', function(){console.log('finish')});
    //res.on('end', function(){console.log('end')});
    res.on('data', function(){});

    
    res.on('error', function(){

        console.log("ERROR ON: " + all[nextAll].theURL);
        all[nextAll].bad = true;
        if(nextAllIterator < all.length)
          setTimeout(removeNext, 0);


    });

    res.on('end', function() {
      console.log("close");
      try {
        all[nextAll].ASIN = res.req.path.match("/([a-zA-Z0-9]{10})(?:[/?]|$)")[0].replace(/\W/g, '')
        delete all[nextAll].url;
        console.log(all[nextAll]);
                if(nextAllIterator < all.length)
          setTimeout(removeNext, 0);
      } catch(e) {
        console.log("ERROR ON: " + all[nextAll].url);
        all[nextAll].bad = true;
                if(nextAllIterator < all.length)
          setTimeout(removeNext, 0);
      }
    });
  });

} catch(e) {
  console.log("ERROR on next: "+JSON.stringify(all[nextAll]));
          all[nextAll].bad = true;
          console.log(e);

}


}

var offset = 0;
for(var z = 0; z < http.globalAgent.maxSockets; z++)
	setTimeout(removeNext, offset+=50)


function doneConverting() {
  var output = JSON.stringify(all)
  fs.writeFileSync("./suatm.json", output);

//  console.log(output);
}
cleanup(doneConverting);
var imageURL = function(ASIN) {return "http://images.amazon.com/images/P/"+ASIN+".01._SCMZZZZZZZ_.jpg"}
