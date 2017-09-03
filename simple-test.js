var folder = "/SampleTests";
var path = require("path").join(__dirname, folder);
require("fs").readdirSync(path).forEach(function(file) {
    //TODO add Tests suffix requirement?
    require("." + folder + '/' + file);
});