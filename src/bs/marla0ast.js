



function TypeDecl(name, params, members) {
	this.name = name;
	this.params = params;
	this.members = members;
}

function TypeCaseDecl(name, members) {
	this.name = name;
	this.members = members;
}

function TypeDataDecl(name, typeref, expr) {
	this.name = name;
	this.typeref = typeref;
	this.expr = expr;
}

function TypeMethodDecl(name, params, body) {
	this.name = name;
	this.params = params;
	this.body = body;
}

function NamedTyperef(name, args) {
	this.name = name;
	this.args = args;
}

function UnitTyperef() {
}





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
	
	exports.TypeDecl = TypeDecl;
	exports.TypeDataDecl = TypeDataDecl;
	exports.TypeCaseDecl = TypeCaseDecl;
	exports.TypeMethodDecl = TypeMethodDecl;
	
	exports.NamedTyperef = NamedTyperef;
	exports.UnitTyperef = UnitTyperef;
	
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
