

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
	// console.log(util.inspect(s, {showHidden: false, depth: null}));
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

function CodeBlock(code) {
	this.code = code;
	this.children = []
}

function CodeBlocks(code) {
	
	var ws = ' \f\n\r\t\v\u00A0\u2028\u2029';
	
	function getIndent(line) {
		var c = 0;
		for (var i = 0; i < line.length; i++) {
			if (ws.indexOf(line[i]) >= 0) {
				c++;
			}
			else {
				break;
			}
		}
		return c;
	}
	
	var lines = code.split(/\r?\n/);
	
	var root = new CodeBlock("");
	var stack = [root];
	var top = root;
	var curIndent = 0;
	
	lines.forEach(function(line) {
		if (/^\s*$/.test(line)) {
			// skip
		}
		else {
			var newTop;
			var indent = getIndent(line);
			var b = new CodeBlock(line); 
			if (indent > curIndent) {
				newTop = top.children[top.children.length-1];
				stack.push(newTop);
				top = newTop;
				curIndent = indent;
			}
			else if (indent < curIndent) {
				stack.pop();
				newTop = stack[stack.length-1];
				top = newTop;
				curIndent = indent;
			}
			top.children.push(b);
		}
		
	});
	
	this.root = root;
}
CodeBlocks.prototype = {
	toString: function() {
		return "????";
	}
}

function compileFile(paths) {
	try {
		var code = fs.readFileSync(path.normalize(paths.i), "utf8");
		var blocks = new CodeBlocks(code);
		console.log(util.inspect(blocks.root, {showHidden: false, depth: null}));
		var s = parser.parse(code);
		var w = new CodeWriter();
		compile(s, w);
		var js = w.toString();
		fs.writeFileSync(path.normalize(paths.o), js, "utf8");
		//console.log(js);
	}
	catch (ex) {
		console.log(ex.message);
	}
}

(function() {
	[
		{i:"../marla/ast.marla", o:"../marla/ast-test.js"},
		{i:"../marla/lang.marla", o:"../marla/lang.js"},
		{i:"../marla/marla.marla", o:"../marla/marla.js"},
		{i:"../marla/mb.marla", o:"../marla/mb.js"},
	]
	.forEach(compileFile);
	process.exit(0);
})();




