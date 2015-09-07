

var ast = require("./marla0ast.js")
var parser = require("./marla0parser.js")
var fs = require('fs')
var path = require('path')
var util = require('util');



function CodeWriter() {
	this.parts = [];
}
CodeWriter.prototype = {
	toString: function() {
		return this.parts.join("");
	}
}

function compile(ast, w) {
	console.log(util.inspect(ast, {showHidden: false, depth: null}));

	var types = ast.filter(function (x) {
		return true;
	});
}

try {
	var code = fs.readFileSync(path.normalize("../marla/mb.marla"), "utf8");
	var ast = parser.parse(code);
	var w = new CodeWriter();
	compile(ast, w); 
	console.log(w.toString());
	process.exit(0);
}
catch (ex) {
	console.log(ex.message);
	process.exit(1);
}





