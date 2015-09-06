
%{
var ast = require("./marla0ast");
%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"type"                return 'TYPE'
"if"                  return 'IF'
"else"                return 'ELSE'
"where"               return 'WHERE'
"->"                  return 'ARROW'
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
"<"                   return '<'
">"                   return '>'
"{"                   return '{'
"}"                   return '}'
":"                   return ':'
"|"                   return '|'
","                   return ','
"?"                   return '?'
"'"                   return 'SQ'
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
    : type_decl
        {$$=$1;}    
    ;
    
module_item_list
    : module_item
        {$$=[$1];}
    | module_item_list module_item
        {$1.push($2);$$=$1;}
    ;
    
type_decl
    : TYPE IDENTIFIER '=' type_members
    | TYPE IDENTIFIER type_params '=' type_members
    ;
    
type_members
    : type_member
    | type_members type_member
    ;
    
type_member
    : '|' IDENTIFIER named_primary_type_list
    | IDENTIFIER ':' typeref
    | IDENTIFIER ':' typeref '=' expr
    | IDENTIFIER '=' expr
    | IDENTIFIER param_list '=' expr
    ;
    
param_list
    : param
    | param_list param
    ;
    
param
    : IDENTIFIER
    | IDENTIFIER ':' primary_typeref
    ;
    
named_primary_type_list
    : named_primary_type
    | named_primary_type_list ',' named_primary_type
    ;
    
named_primary_type
    : IDENTIFIER ':' primary_typeref
    ;
    
type_param
    : SQ IDENTIFIER
    ;
    
type_params
    : type_param
    | type_params type_param
    ;
    
typeref
    : fun_typeref
    ;
    
primary_typeref
    : IDENTIFIER
    | IDENTIFIER '<' type_args '>'
    | SQ IDENTIFIER
    | map_typeref
    | '{' typeref ':' typeref '}'
    | '(' tuple_type_args ')'
    | '(' ')'
    | primary_typeref '?'
    ;
    
tuple_type_args
    : tuple_type_arg
    | tuple_type_args ',' tuple_type_arg
    ;
    
tuple_type_arg
    : typeref
    ;
    
type_args
    : type_arg
    | type_args ',' type_arg
    ;
    
type_arg
    : typeref
    ;
    
fun_typeref
    : primary_typeref
    | fun_typeref ARROW primary_typeref
    ;
    
expr: INT;
    
    
/*
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

*/
