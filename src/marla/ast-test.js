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

function UnitTyperef() {
    Typeref.call(this);
}
UnitTyperef.prototype = Object.create(Typeref.prototype, {
});
UnitTyperef.prototype.constructor = UnitTyperef;
exports.UnitTyperef = UnitTyperef;

