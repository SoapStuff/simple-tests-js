var folder = "/SampleTests";
var path = require("path").join(__dirname, folder);
var testRunner = require("./testRunner");
require("fs").readdirSync(path).forEach(function(file) {
    //TODO add Tests suffix requirement?
    require("." + folder + '/' + file);
});
console.log("======== TEST RESULTS ========");
console.log("Passed Tests: " + testRunner.getPassed());
console.log("Failed Tests: " + testRunner.getFailed());
console.log("==============================");