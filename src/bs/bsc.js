

var ast = require("../marla/ast")
var parser = require("./marla0parser.js")
var fs = require('fs')
var path = require('path')
var util = require('util');



function CodeWriter() {
	this.parts = [];
	this.indentLevel = 0;
	this.needsIndent = false;
	this.indentString = "    ";
}
CodeWriter.prototype = {
	toString: function() {
		return this.parts.join("");
	},
	write: function(s) {
		this.writeIndentIfNeeded();
		this.parts.push(s);
	},
	writen: function(s) {
		this.writeIndentIfNeeded();
		this.parts.push(s);
		this.parts.push("\n");
		this.needsIndent = true;
	},
	indent: function() {
		this.indentLevel++;
	},
	outdent: function() {
		this.indentLevel--;
	},
	writeIndentIfNeeded: function() {
		if (this.needsIndent) {
			this.needsIndent = false;
			for (var i = 0; i < this.indentLevel; i++) {
				this.parts.push(this.indentString);
			}
		}
	},
}

function compile(s, w) {
	console.log(util.inspect(s, {showHidden: false, depth: null}));
	var typeDecls =
		s
		.filter(function(x){return x instanceof ast.TypeDecl});

	typeDecls.forEach(function (x) {
		var head = "";
			
		w.write("function ")
		w.write(x.name)
		
		w.write("(");
		head = "";
		var xdataMems =
			x.members
			.filter(function(x){return x instanceof ast.DataTypeDeclMember});
		xdataMems.forEach(function(x){
			w.write(head); head=", ";
			w.write(x.name)})
		w.writen(") {");
		w.indent();
		xdataMems.forEach(function(x){
			w.write("this.");
			w.write(x.name);
			w.write(" = ");
			w.write(x.name);
			w.writen(";");
			});
		w.outdent();				
		w.writen("}");
	
		w.write(x.name);
		w.writen(".prototype = {");
		w.indent();
		w.outdent();
		w.writen("};");
		
		w.write("exports.")
		w.write(x.name)
		w.write(" = ")
		w.write(x.name)
		w.writen(";");
		w.writen("");
		
		var caseMems =
			x.members
			.filter(function(x){return x instanceof ast.CaseTypeDeclMember});
		caseMems.forEach(function(y) {
			w.write("function ")
			w.write(y.name + x.name)
			
			w.write("(");
			head = "";
			var ydataMems = y.members;
			xdataMems.forEach(function(x){
				w.write(head); head=", ";
				w.write(x.name)});
			ydataMems.forEach(function(x){
				w.write(head); head=", ";
				w.write(x.name)});
			w.writen(") {");
			w.indent();
			w.write(x.name);
			w.write(".call(this");
			head = ", ";
			xdataMems.forEach(function(x){
				w.write(head);head=", ";
				w.write(x.name);
				});
			w.writen(");");
			ydataMems.forEach(function(x){
				w.write("this.");
				w.write(x.name);
				w.write(" = ");
				w.write(x.name);
				w.writen(";");
				});
			w.outdent();				
			w.writen("}");
			
			w.write(y.name + x.name);
			w.write(".prototype = Object.create(");
			w.write(x.name);
			w.writen(".prototype, {");
			w.indent();
			w.outdent();
			w.writen("});");
			w.write(y.name + x.name);
			w.write(".prototype.constructor = ");
			w.write(y.name + x.name);
			w.writen(";");
			
			w.write("exports.")
			w.write(y.name + x.name)
			w.write(" = ")
			w.write(y.name + x.name)
			w.writen(";");
			
			w.writen("");
		});

			
	});
	
}

function compileFile(paths) {
	try {
		var code = fs.readFileSync(path.normalize(paths.i), "utf8");
		var s = parser.parse(code);
		var w = new CodeWriter();
		compile(s, w);
		var js = w.toString();
		fs.writeFileSync(path.normalize(paths.o), js, "utf8");
		console.log(js);
	}
	catch (ex) {
		console.log(ex.message);
	}
}

(function() {
	[
		{i:"../marla/ast.marla", o:"../marla/ast.js"},
		{i:"../marla/mb.marla", o:"../marla/mb.js"},
	]
	.forEach(compileFile);
	process.exit(0);
})();




