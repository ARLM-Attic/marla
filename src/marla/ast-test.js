function TypeDecl(name, params, members) {
    this.name = name;
    this.params = params;
    this.members = members;
}
TypeDecl.prototype = {
};
exports.TypeDecl = TypeDecl;

function TypeDeclMember(name) {
    this.name = name;
}
TypeDeclMember.prototype = {
};
exports.TypeDeclMember = TypeDeclMember;

function CaseTypeDeclMember(name, members) {
    TypeDeclMember.call(this, name);
    this.members = members;
}
CaseTypeDeclMember.prototype = Object.create(TypeDeclMember.prototype, {
});
CaseTypeDeclMember.prototype.constructor = CaseTypeDeclMember;
exports.CaseTypeDeclMember = CaseTypeDeclMember;

function DataTypeDeclMember(name, typeref, initialValue) {
    TypeDeclMember.call(this, name);
    this.typeref = typeref;
    this.initialValue = initialValue;
}
DataTypeDeclMember.prototype = Object.create(TypeDeclMember.prototype, {
});
DataTypeDeclMember.prototype.constructor = DataTypeDeclMember;
exports.DataTypeDeclMember = DataTypeDeclMember;

function MethodTypeDeclMember(name, params, body) {
    TypeDeclMember.call(this, name);
    this.params = params;
    this.body = body;
}
MethodTypeDeclMember.prototype = Object.create(TypeDeclMember.prototype, {
});
MethodTypeDeclMember.prototype.constructor = MethodTypeDeclMember;
exports.MethodTypeDeclMember = MethodTypeDeclMember;

function Typeref() {
}
Typeref.prototype = {
};
exports.Typeref = Typeref;

function NamedTyperef(name, args) {
    Typeref.call(this);
    this.name = name;
    this.args = args;
}
NamedTyperef.prototype = Object.create(Typeref.prototype, {
});
NamedTyperef.prototype.constructor = NamedTyperef;
exports.NamedTyperef = NamedTyperef;

function MemberTyperef(typeref, name) {
    Typeref.call(this);
    this.typeref = typeref;
    this.name = name;
}
MemberTyperef.prototype = Object.create(Typeref.prototype, {
});
MemberTyperef.prototype.constructor = MemberTyperef;
exports.MemberTyperef = MemberTyperef;

function UnitTyperef() {
    Typeref.call(this);
}
UnitTyperef.prototype = Object.create(Typeref.prototype, {
});
UnitTyperef.prototype.constructor = UnitTyperef;
exports.UnitTyperef = UnitTyperef;

function RecBinding(name, value) {
    this.name = name;
    this.value = value;
}
RecBinding.prototype = {
};
exports.RecBinding = RecBinding;

function Expr() {
}
Expr.prototype = {
};
exports.Expr = Expr;

function VarExpr(name) {
    Expr.call(this);
    this.name = name;
}
VarExpr.prototype = Object.create(Expr.prototype, {
});
VarExpr.prototype.constructor = VarExpr;
exports.VarExpr = VarExpr;

function IfExpr(predicate, value, alternate) {
    Expr.call(this);
    this.predicate = predicate;
    this.value = value;
    this.alternate = alternate;
}
IfExpr.prototype = Object.create(Expr.prototype, {
});
IfExpr.prototype.constructor = IfExpr;
exports.IfExpr = IfExpr;

function RecExpr(bindings, value) {
    Expr.call(this);
    this.bindings = bindings;
    this.value = value;
}
RecExpr.prototype = Object.create(Expr.prototype, {
});
RecExpr.prototype.constructor = RecExpr;
exports.RecExpr = RecExpr;

function ApplicationExpr(fun, body) {
    Expr.call(this);
    this.fun = fun;
    this.body = body;
}
ApplicationExpr.prototype = Object.create(Expr.prototype, {
});
ApplicationExpr.prototype.constructor = ApplicationExpr;
exports.ApplicationExpr = ApplicationExpr;

function Literal() {
}
Literal.prototype = {
};
exports.Literal = Literal;

function StringLiteral(value) {
    Literal.call(this);
    this.value = value;
}
StringLiteral.prototype = Object.create(Literal.prototype, {
});
StringLiteral.prototype.constructor = StringLiteral;
exports.StringLiteral = StringLiteral;

function IntLiteral(value) {
    Literal.call(this);
    this.value = value;
}
IntLiteral.prototype = Object.create(Literal.prototype, {
});
IntLiteral.prototype.constructor = IntLiteral;
exports.IntLiteral = IntLiteral;

function FloatLiteral(value) {
    Literal.call(this);
    this.value = value;
}
FloatLiteral.prototype = Object.create(Literal.prototype, {
});
FloatLiteral.prototype.constructor = FloatLiteral;
exports.FloatLiteral = FloatLiteral;

