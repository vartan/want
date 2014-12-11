var combined = require('./tiwib.json').concat(require('./suatm.json'));
for (var i = 0; i < combined.length; i++) {
    var product1 = combined[i];
    for (var j = i + 1; j < combined.length; j++) {
        var product2 = combined[j];
        if (product1.ASIN == product2.ASIN) {
            combined.splice(j--, 1);
        }
    }
}



for (var i = 0; i < combined.length; i++) {
    if (combined[i].hasOwnProperty("bad"))
        delete combined[i].bad;
    if (!combined[i].hasOwnProperty("ASIN"))
        combined.splice(i--, 1);
}
console.log(JSON.stringify(combined));
//console.log(combined.length);