
%{
var ast = require("./marla0ast");
%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"IF"                  return 'IF'
"ELSE"                return 'ELSE'
"WHERE"               return 'WHERE'
[0-9]+\b              return 'INT'
[0-9]+("."[0-9]+)\b   return 'FLOAT'
[a-zA-Z_]\w*          return 'IDENTIFIER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"="                   return '='
"("                   return '('
")"                   return ')'
":"                   return ':'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%token IDENTIFIER
%token FLOAT INT
%token LOGICAL_AND_OP LOGICAL_OR_OP
%token WHERE IF ELSE

%start module

%% /* language grammar */


module
    : module_item_list EOF
        {return $1;}
    ;

module_item
    : stmt
        {$$=$1;}
    ;

module_item_list
    : module_item
        {$$=[$1];}
    | module_item_list module_item
        {$1.push($3);$$=$1;}
    ;

stmt
    : postfix_expr '=' expr
        {$$=new ast.AssignStmt($1, $3);}
    ;

expr
    : or_expr
        {$$=$1;}
    | or_expr WHERE bind_list
        {$$=new ast.WhereExpr($1, $3);}
    | or_expr IF or_expr ELSE or_expr
        {$$=new ast.IfExpr($1, $3, $5);}
    ;

primary_expr
    : IDENTIFIER
        {$$=new ast.VarExpr($1);}
    | literal
    ;

literal
    : FLOAT
        {$$=new ast.FloatLit($1);}
    | INT
        {$$=new ast.IntLit($1);}
    | BOOL
        {$$=new ast.BoolLit($1);}
    | STRING
        {$$=new ast.StringLit($1);}
    ;

postfix_expr
    : primary_expr
    | postfix_expr '.' IDENTIFIER
    ;

unary_expr
    : postfix_expr
    | unary_op unary_expr
    ;

unary_op
    : '-'
    | '!'
    ;

application_arg_list
    : unary_expr
    | application_arg_list unary_expr
    ;

application_expr
    : unary_expr
    | postfix_expr application_arg_list
        {$$=new ast.ApplicationExpr($1, $2);}
    ;

mul_expr
    : application_expr
    | mul_expr '*' application_expr
    ;

add_expr
    : mul_expr
    | add_expr '+' mul_expr
    ;

rel_expr
    : add_expr
    | rel_expr '<' add_expr
    ;

eq_expr
    : rel_expr
    | eq_expr '=' rel_expr
    ;

and_expr
    : eq_expr
    | and_expr LOGICAL_AND_OP rel_expr
    ;

or_expr
    : and_expr
    | or_expr LOGICAL_OR_OP and_expr
    ;

expr_ww
    : or_expr
    ;

bind
    : IDENTIFIER '=' expr_ww
    ;

bind_list
    : bind
    | bind_list ';' bind
    ;

