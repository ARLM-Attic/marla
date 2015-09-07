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

