function Module(members) {
    this.members = members;
}
Module.prototype = {
};
exports.Module = Module;

function ModuleMember(name) {
    this.name = name;
}
ModuleMember.prototype = {
};
exports.ModuleMember = ModuleMember;

function ImportModuleMember(name, url) {
    ModuleMember.call(this, name);
    this.url = url;
}
ImportModuleMember.prototype = Object.create(ModuleMember.prototype, {
});
ImportModuleMember.prototype.constructor = ImportModuleMember;
exports.ImportModuleMember = ImportModuleMember;

function TypeModuleMember(name, params, members) {
    ModuleMember.call(this, name);
    this.params = params;
    this.members = members;
}
TypeModuleMember.prototype = Object.create(ModuleMember.prototype, {
});
TypeModuleMember.prototype.constructor = TypeModuleMember;
exports.TypeModuleMember = TypeModuleMember;

function DataModuleMember(name, typeref, initialValue) {
    ModuleMember.call(this, name);
    this.typeref = typeref;
    this.initialValue = initialValue;
}
DataModuleMember.prototype = Object.create(ModuleMember.prototype, {
});
DataModuleMember.prototype.constructor = DataModuleMember;
exports.DataModuleMember = DataModuleMember;

function FunModuleMember(name, params, body) {
    ModuleMember.call(this, name);
    this.params = params;
    this.body = body;
}
FunModuleMember.prototype = Object.create(ModuleMember.prototype, {
});
FunModuleMember.prototype.constructor = FunModuleMember;
exports.FunModuleMember = FunModuleMember;

function FunParam(name, typeref) {
    this.name = name;
    this.typeref = typeref;
}
FunParam.prototype = {
};
exports.FunParam = FunParam;

function TypeMember(name) {
    this.name = name;
}
TypeMember.prototype = {
};
exports.TypeMember = TypeMember;

function CaseTypeMember(name, members) {
    TypeMember.call(this, name);
    this.members = members;
}
CaseTypeMember.prototype = Object.create(TypeMember.prototype, {
});
CaseTypeMember.prototype.constructor = CaseTypeMember;
exports.CaseTypeMember = CaseTypeMember;

function DataTypeMember(name, typeref, initialValue) {
    TypeMember.call(this, name);
    this.typeref = typeref;
    this.initialValue = initialValue;
}
DataTypeMember.prototype = Object.create(TypeMember.prototype, {
});
DataTypeMember.prototype.constructor = DataTypeMember;
exports.DataTypeMember = DataTypeMember;

function FunTypeMember(name, params, body) {
    TypeMember.call(this, name);
    this.params = params;
    this.body = body;
}
FunTypeMember.prototype = Object.create(TypeMember.prototype, {
});
FunTypeMember.prototype.constructor = FunTypeMember;
exports.FunTypeMember = FunTypeMember;

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

