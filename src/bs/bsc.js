

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

function CodeBlock(indent, code) {
	this.indent = indent;
	this.code = code;
	this.children = [];
}
CodeBlock.prototype = {
	write: function(parts) {
		parts.push(this.code);
		parts.push("\n");
		if (this.children.length > 0) {
			parts.push("»\n");
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].write(parts);				
			}
			parts.push("«\n");
		}
	}
};

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
	
	var root = new CodeBlock(-1, "");
	var stack = [root];
	var top = root;
	
	lines.forEach(function(line) {
		if (/^\s*$/.test(line)) {
			// skip
		}
		else {
			var newTop;
			var indent = getIndent(line);
			var b = new CodeBlock(indent, line.trim()); 
			if (top.children.length > 0) {
				if (indent > top.children[0].indent) {
					newTop = top.children[top.children.length-1];
					stack.push(newTop);
					top = newTop;
				}
				while (top.children.length > 0 && indent < top.children[0].indent) {
					stack.pop();
					top = stack[stack.length-1];
					// Nothing
					// console.log("??");
				}
			}
			top.children.push(b);
		}
		
	});
	
	this.root = root;
}
CodeBlocks.prototype = {
	toString: function() {
		var parts = [];		
		for (var i = 0; i < this.root.children.length; i++) {
			this.root.children[i].write(parts);
		}
		return parts.join("");
	}
}

function compileFile(paths) {
	try {
		var code = fs.readFileSync(path.normalize(paths.i), "utf8");
		var blocks = new CodeBlocks(code);
		var bcode = blocks.toString();
		// console.log(bcode);
		// console.log(util.inspect(blocks.root, {showHidden: false, depth: null}));
		var s = parser.parse(bcode);
		var w = new CodeWriter();
		compile(s, w);
		var js = w.toString();
		fs.writeFileSync(path.normalize(paths.o), js, "utf8");
		//console.log(js);
	}
	catch (ex) {
		console.log("\033[4m" + paths.i + ":\033[24m \033[95m" + ex.message + "\033[0m");
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




