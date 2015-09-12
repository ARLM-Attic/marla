function Document(name, code) {
    this.name = name;
    this.code = code;
}
Document.prototype = {
};
exports.Document = Document;

function ParseResult(types, intermediate) {
    this.types = types;
    this.intermediate = intermediate;
}
ParseResult.prototype = {
};
exports.ParseResult = ParseResult;

function CombinedDecls(types, intermediate) {
    this.types = types;
    this.intermediate = intermediate;
}
CombinedDecls.prototype = {
};
exports.CombinedDecls = CombinedDecls;

function DefsResult(types) {
    this.types = types;
}
DefsResult.prototype = {
};
exports.DefsResult = DefsResult;

function FrontEnd(parse, getDefs) {
    this.parse = parse;
    this.getDefs = getDefs;
}
FrontEnd.prototype = {
};
exports.FrontEnd = FrontEnd;

function CodeWriter(parts, indentString) {
    this.parts = parts;
    this.indentString = indentString;
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

