var colors = require("colors");
module.exports.runTests = function(folder) {
    var path = require("path").join(__dirname, folder);
    var testRunner = require("./testRunner");
    require("fs").readdirSync(path).forEach(function(file) {
        //TODO add Tests suffix requirement?
        require("." + folder + '/' + file);
    });
    console.log("======== ".yellow + "TEST RESULTS".underline.white +  " ========".yellow);
    console.log(("Passed Tests: " + testRunner.getPassed()).green);
    console.log(("Failed Tests: " + testRunner.getFailed()).red);
    console.log("==============================".yellow);
};