function Document(name, code) {
    this.name = name;
    this.code = code;
}
Document.prototype = {
};
exports.Document = Document;

function ParseResult(module, messages, intermediate) {
    this.module = module;
    this.messages = messages;
    this.intermediate = intermediate;
}
ParseResult.prototype = {
};
exports.ParseResult = ParseResult;

function CombinedDecls(modules, intermediate) {
    this.modules = modules;
    this.intermediate = intermediate;
}
CombinedDecls.prototype = {
};
exports.CombinedDecls = CombinedDecls;

function CompileResult(messages, module) {
    this.messages = messages;
    this.module = module;
}
CompileResult.prototype = {
};
exports.CompileResult = CompileResult;

function FrontEnd(parse, compile) {
    this.parse = parse;
    this.compile = compile;
}
FrontEnd.prototype = {
};
exports.FrontEnd = FrontEnd;

function CodeWriter(parts, indentString) {
    this.parts = parts;
    this.indentString = indentString;
}
CodeWriter.prototype = {
    toString: function() {
        "".join(parts)},
    write: function(s) {
        writeIndentIfNeeded();
        parts.push(s);
    },
    writen: function(s) {
        writeIndentIfNeeded();
        parts.push(s);
        parts.push("\n");
        needsIndex = true;
    },
    indent: function() {
        indentLevel = (indentLevel) + (1);
    },
    outdent: function() {
        indentLevel = (indentLevel) - (1);
    },
    writeIndentIfNeeded: function() {
        if (needsIndent) {
            needsIndent = false;
            for (var i = 0; i < indentLevel; i++) {
                parts.push(indentString);
            }
        }
    },
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

