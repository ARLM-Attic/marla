

var ast = require("./marla0ast.js")
var parser = require("./marla0parser.js")
var fs = require('fs')
var path = require('path')

var code = fs.readFileSync(path.normalize("../marla/mb.marla"), "utf8");


try {
	var ast = parser.parse(code);
	console.log(ast.map(function (x) { return x.toCode(); }).join("\n"));
	process.exit(0);
}
catch (ex) {
	console.log(ex.message);
	process.exit(1);
}





