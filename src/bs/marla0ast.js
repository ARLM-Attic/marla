
function AssignStmt(name, expr) {
	this.name = name;
	this.expr = expr;
}
AssignStmt.prototype = {
	toCode: function(e) { return this.name.toCode() + " = " + this.expr.toCode(e); }
}

function IntLit(value) {
	this.value = +value;
}
IntLit.prototype = {
	toCode: function(e) { return this.value + ""; }
}

function FloatLit(value) {
	this.value = +value;
}
FloatLit.prototype = {
	toCode: function(e) { return this.value + ""; }
}

function StringLit(value) {
	this.value = value + "";
}
StringLit.prototype = {
	toCode: function(e) { return this.value; }
}

function BoolLit(value) {
	this.value = value === "true";
}
BoolLit.prototype = {
	toCode: function(e) { return this.value + ""; }
}

function VarExpr(value) {
	this.value = value + "";
}
VarExpr.prototype = {
	toCode: function(e) { return this.value; }
}
function WhereExpr(value, bindings) {
	this.value = value;
}
WhereExpr.prototype = {
	toCode: function(e) { return this.value.toCode () + " where "; }
}
function IfExpr(value) {
	this.value = value;
}
IfExpr.prototype = {
	toCode: function(e) { return "IF" + this.value; }
}


function ApplicationExpr(value, args) {
	this.value = value;
}
ApplicationExpr.prototype = {
	toCode: function(e) { return "APP" + this.value.toCode (); }
}




if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
	exports.AssignStmt = AssignStmt;
	exports.StringLit = StringLit;
	exports.BoolLit = BoolLit;
	exports.FloatLit = FloatLit;
	exports.IntLit = IntLit;
	exports.VarExpr = VarExpr;
	exports.WhereExpr = WhereExpr;
	exports.IfExpr = IfExpr;
	exports.ApplicationExpr = ApplicationExpr;
}
