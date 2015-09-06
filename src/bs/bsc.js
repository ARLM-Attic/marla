

var ast = require("./marla0ast.js")
var parser = require("./marla0parser.js")

var code = require('fs').readFileSync(require('path').normalize("../marla/mb.marla"), "utf8");


var r = parser.parse(code);

console.log(r.map(function (x) { return x.toCode(); }).join("\n"));


