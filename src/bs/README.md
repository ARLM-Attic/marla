# Marla Bootstrap Compiler

The goal is to write the Marla compiler in Marla itself and to eat from an endless supply of cake.

But your computer (and mine at this time of writing) has no idea how to compile Marla code.
To work around that little problem, `bsc.js` was written.

This is a Marla-0 language compiler written in JavaScript and executed using Node.

Marla-0 is the subset of Marla that I felt like implementing in JavaScript.
It has just enough features to make writing the real Marla compiler tolerable.

It's front-end is limited to Marla-0, it dispenses with type checking (or much checking at all),
and it only emits JavaScript.

THIS IS NOT THE COMPILER YOU'RE LOOKING FOR.

