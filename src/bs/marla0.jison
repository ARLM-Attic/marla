
%{
var ast = require("../marla/ast");
//console.log("LEX " + parser.terminals_[r]);
%}

/* lexical grammar */
%lex
%%

("//".*?)((\r?\n))    /* skip line comment */
[\t ]                 /* skip line whitespace */
(\r?\n)               return 'LF'
"»"                   return 'INDENT'
"«"                   return 'OUTDENT'
"..."                 return 'NOTIMPL'
"..<"                 return 'RANGE'
"true"                return 'TRUE'
"false"               return 'FALSE'
"type"                return 'TYPE'
"for"                 return 'FOR'
"if"                  return 'IF'
"else"                return 'ELSE'
"where"               return 'WHERE'
"import"              return 'IMPORT'
"->"                  return 'ARROW'
[0-9]+\b              return 'INT'
[0-9]+("."[0-9]+)\b   return 'FLOAT'
\"(\\.|[^"])*\"       return 'STRING'
[a-zA-Z_]\w*          return 'IDENTIFIER'
"=="                  return 'EQ_OP'
">="                  return 'GE_OP'
"<="                  return 'LE_OP'
"<-"                  return 'ASSIGN_OP'
"!"                   return '!'
"."                   return '.'
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
"["                   return '['
"]"                   return ']'
"\\"                  return '\\'
":"                   return ':'
";"                   return ';'
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
    : module_member_list LF EOF
        {return new ast.Module($1);}
    | module_member_list EOF
        {return new ast.Module($1);}
    | EOF
        {return new ast.Module([]);}
    ;

module_member
    : type_decl
        {$$=$1;}
    | member_head member_type member_body
        {$$=new ast.DataModuleMember($1,$2,$3);}
    | member_head params member_type member_body
        {$$=new ast.FunModuleMember($1,$2,$3,$4);}
    | IMPORT STRING
        {$$=$2+"";}
    | TYPE IDENTIFIER '=' NOTIMPL
        {$$=new ast.TypeModuleMember($2,[],[]);}    
    | TYPE IDENTIFIER '=' LF INDENT LF type_members LF OUTDENT
        {$$=new ast.TypeModuleMember($2,[],$7);}    
    | TYPE IDENTIFIER '<' type_params '>' '=' LF INDENT LF type_members LF OUTDENT
        {$$=new ast.TypeModuleMember($2,$4,$10);}    
    ;
    
module_member_list
    : module_member
        {$$=[$1];}
    | module_member_list LF module_member
        {$1.push($3);$$=$1;}
    ;
    
type_members
    : type_member
        {$$=[$1];}
    | type_members LF type_member
        {$1.push($3);$$=$1;}
    ;
    
member_head
    : IDENTIFIER
        {$$=$1;}
    | IDENTIFIER '!'
        {$$=$1;}
    ;
    
member_type
    : ':' typeref
        {$$=$2;}
    |
        {$$=null;}
    ;
    
member_body
    : '=' expr_or_block
        {$$=$2;}
    |
        {$$=null;}
    ;
    
type_member
    : '|' IDENTIFIER
        {$$=new ast.CaseTypeMember($2, []);}    
    | '|' IDENTIFIER '(' type_case_data_list ')'
        {$$=new ast.CaseTypeMember($2, $4);}    
    | '|' IDENTIFIER '(' ')'
        {$$=new ast.CaseTypeMember($2, []);}    
    | member_head member_type member_body
        {$$=new ast.DataTypeMember($1,$2,$3);}    
    | member_head params member_type member_body
        {$$=new ast.FunTypeMember($1,$2,$3,$4);}    
    ;
    
params
    : IDENTIFIER
        {$$=[$1];}
    | '(' param_list ')'
        {$$=$2;}
    | '(' ')'
        {$$=[];}
    ;
    
param_list
    : param
        {$$=[$1];}
    | param_list ',' param
        {$1.push($3);$$=$1;}
    ;
    
param
    : IDENTIFIER
    | IDENTIFIER ':' primary_typeref
    ;
    
type_case_data_list
    : type_case_data
        {$$=[$1];}
    | type_case_data_list ',' type_case_data
        {$1.push($3);$$=$1;}
    ;
    
type_case_data
    : IDENTIFIER ':' primary_typeref
        {$$=new ast.DataTypeMember($1,$3,null);}
    ;
    
type_param
    : SQ IDENTIFIER
        {$$="'"+$2;}
    ;
    
type_params
    : type_param
        {$$=[$1];}
    | type_params ',' type_param
        {$1.push($3);$$=$1;}
    ;
    
typeref
    : fun_typeref
    ;
    
primary_typeref
    : IDENTIFIER
        {$$=new ast.NamedTyperef($1,[]);}
    | IDENTIFIER '<' type_args '>'
        {$$=new ast.NamedTyperef($1,$3);}
    | SQ IDENTIFIER
        {$$=new ast.NamedTyperef("'"+$2,[]);}
    | '{' typeref ':' typeref '}'
        {$$=new ast.NamedTyperef("Map", [$2,$4]);}
    | '(' tuple_type_args ')'
        {$$=new ast.NamedTyperef("Tuple", $2);}
    | '[' typeref ']'
        {$$=new ast.NamedTyperef("Array", [$2]);}
    | '{' typeref '}'
        {$$=new ast.NamedTyperef("Set", [$2]);}
    | '\' typeref '\'
        {$$=new ast.NamedTyperef("Seq", [$2]);}
    | '(' ')'
        {$$=new ast.UnitTyperef();}
    | primary_typeref '?'
        {$$=new ast.NamedTyperef("Option", [$1]);}
    | primary_typeref '.' member_ref
        {$$=new ast.MemberTyperef($1, [$3]);}
    ;
    
member_ref
    : IDENTIFIER
    ;
    
tuple_type_args
    : tuple_type_arg
        {$$=[$1];}
    | tuple_type_args ',' tuple_type_arg
        {$1.push($3);$$=$1;}
    ;
    
tuple_type_arg
    : typeref
        {$$=$1;}
    ;
    
type_args
    : type_arg
        {$$=[$1];}
    | type_args ',' type_arg
        {$1.push($3);$$=$1;}
    ;
    
type_arg
    : typeref
        {$$=$1;}
    ;
    
fun_typeref
    : primary_typeref
        {$$=$1;}
    | primary_typeref ARROW primary_typeref
        {$$=new ast.NamedTyperef("Fun", [$1,$3]);}
    ;
    
    
    
    
    
    
    
expr_or_block
    : expr
        {$$=$1;}
    | LF INDENT LF stmt_list LF OUTDENT 
        {$$=($4.length==1)?($4[0]):(new ast.BlockExpr($4));}
    ;

expr
    : or_expr
        {$$=$1;}
    | or_expr WHERE rec_binding_inline_list
        {$$=new ast.WhereExpr($1, $3);}
    | or_expr WHERE LF INDENT LF rec_binding_block_list LF OUTDENT
        {$$=new ast.WhereExpr($1, $6);}
    | or_expr IF or_expr ELSE or_expr
        {$$=new ast.IfExpr($1, $3, $5);}
    ;

expr_ww
    : or_expr
        {$$=$1;}
    | or_expr IF or_expr ELSE or_expr
        {$$=new ast.IfExpr($1, $3, $5);}
    ;

primary_expr
    : IDENTIFIER
        {$$=new ast.VarExpr($1);}
    | literal
        {$$=new ast.LiteralExpr($1);}
    | map_ctor_expr
        {$$=$1;}
    ;
    
map_ctor_element_inline
    : IDENTIFIER ':' expr_ww
    ;
    
map_ctor_element_inline_list
    : map_ctor_element_inline
    | map_ctor_element_inline_list ';' map_ctor_element_inline
    ;
    
map_ctor_element_block
    : IDENTIFIER ':' expr
    ;
    
map_ctor_element_block_list
    : map_ctor_element_block
    | map_ctor_element_block_list LF map_ctor_element_block
    ;
    
map_ctor_expr
    : '{' map_ctor_element_inline_list  '}' 
    | '{' LF INDENT LF map_ctor_element_block_list LF OUTDENT LF '}'
    ; 

literal
    : FLOAT
        {$$=new ast.FloatLiteral($1);}
    | INT
        {$$=new ast.IntLiteral($1);}
    | TRUE
        {$$=new ast.BoolLiteral(true);}
    | FALSE
        {$$=new ast.BoolLiteral(false);}
    | STRING
        {$$=new ast.StringLiteral($1);}
    ;

postfix_expr
    : primary_expr
        {$$=$1;}
    | postfix_expr '.' IDENTIFIER
        {$$=new ast.MemberExpr($1,$3);}
    ;

unary_expr
    : postfix_expr
        {$$=$1;}
    | unary_op unary_expr
    ;

unary_op
    : '-'
    | '!'
    ;

application_arg_list
    : expr
        {$$=[$1];}
    | application_arg_list ',' expr
        {$1.push($3);$$=$1;}
    ;

application_expr    
    : unary_expr
        {$$=$1;}
    | postfix_expr '(' application_arg_list ')'
        {$$=new ast.ApplyExpr($1, $3);}
    | postfix_expr '(' ')'
        {$$=new ast.ApplyExpr($1, []);}
    ;

mul_expr
    : application_expr
        {$$=$1;}
    | mul_expr '*' application_expr
    | mul_expr '/' application_expr
    ;

add_expr
    : mul_expr
    | add_expr '+' mul_expr
        {$$=new ast.ApplyExpr(new ast.VarExpr("+"), [$1, $3]);}
    | add_expr '-' mul_expr
        {$$=new ast.ApplyExpr(new ast.VarExpr("-"), [$1, $3]);}
    ;

rel_expr
    : add_expr
    | rel_expr '<' add_expr
    | rel_expr LE_OP add_expr
    | rel_expr '>' add_expr
    | rel_expr GE_OP add_expr
    ;

eq_expr
    : rel_expr
    | eq_expr EQ_OP rel_expr
    ;

and_expr
    : eq_expr
    | and_expr LOGICAL_AND_OP eq_expr
    ;

or_expr
    : and_expr
    | or_expr LOGICAL_OR_OP and_expr
    ;

rec_binding_inline
    : IDENTIFIER '=' expr_ww
    ;

rec_binding_inline_list
    : rec_binding_inline
    | rec_binding_inline_list ';' rec_binding_inline
    ;

rec_binding_block
    : IDENTIFIER '=' expr_or_block
    ;

rec_binding_block_list
    : rec_binding_block
    | rec_binding_block_list LF rec_binding_block
    ;





stmt
    : IDENTIFIER '=' expr_or_block
        {$$=new ast.LetStmt($1, null, $3);}
    | IDENTIFIER ':' typeref '=' expr_or_block
        {$$=new ast.LetStmt($1, $3, $5);}
    | expr
        {$$=new ast.ExprStmt($1);}
    | expr ASSIGN_OP expr_or_block
        {$$=new ast.AssignStmt($1, $3);}
    | IF expr LF INDENT LF stmt_list LF OUTDENT
        {$$=new ast.IfStmt($2, $6, null);}
    | FOR IDENTIFIER '=' expr RANGE expr LF INDENT LF stmt_list LF OUTDENT
        {$$=new ast.ForStmt($2, $4, $10);}
    ;
    
stmt_list
    : stmt
        {$$=[$1];}
    | stmt_list LF stmt
        {$1.push($3);$$=$1;}
    ;








