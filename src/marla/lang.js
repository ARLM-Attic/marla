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

function CodeWriter() {
}
CodeWriter.prototype = {
};
exports.CodeWriter = CodeWriter;

function BackEnd(write) {
    this.write = write;
}
BackEnd.prototype = {
};
exports.BackEnd = BackEnd;

function Language(name, frontEnd, backEnd) {
    this.name = name;
    this.frontEnd = frontEnd;
    this.backEnd = backEnd;
}
Language.prototype = {
};
exports.Language = Language;

