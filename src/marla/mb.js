function Lit() {
}
Lit.prototype = {
};
exports.Lit = Lit;

function StringLitLit(value) {
    Lit.call(this);
    this.value = value;
}
StringLitLit.prototype = Object.create(Lit.prototype, {
});
StringLitLit.prototype.constructor = StringLitLit;
exports.StringLitLit = StringLitLit;

function IntLitLit(value) {
    Lit.call(this);
    this.value = value;
}
IntLitLit.prototype = Object.create(Lit.prototype, {
});
IntLitLit.prototype.constructor = IntLitLit;
exports.IntLitLit = IntLitLit;

function FloatLitLit(value) {
    Lit.call(this);
    this.value = value;
}
FloatLitLit.prototype = Object.create(Lit.prototype, {
});
FloatLitLit.prototype.constructor = FloatLitLit;
exports.FloatLitLit = FloatLitLit;

function NamedType(name) {
    this.name = name;
}
NamedType.prototype = {
};
exports.NamedType = NamedType;

function NamesPassResult(names) {
    this.names = names;
}
NamesPassResult.prototype = {
};
exports.NamesPassResult = NamesPassResult;

function CombinedNames(names) {
    this.names = names;
}
CombinedNames.prototype = {
};
exports.CombinedNames = CombinedNames;

function CombinedTypes(types) {
    this.types = types;
}
CombinedTypes.prototype = {
};
exports.CombinedTypes = CombinedTypes;

function FrontEnd(parse, typesPass, astPass) {
    this.parse = parse;
    this.typesPass = typesPass;
    this.astPass = astPass;
}
FrontEnd.prototype = {
};
exports.FrontEnd = FrontEnd;

function Language(name, frontEnd) {
    this.name = name;
    this.frontEnd = frontEnd;
}
Language.prototype = {
};
exports.Language = Language;

