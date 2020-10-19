
%{
    const CL_Error = require('../build/Errores/L_Error');
    const CN_Error = require('../build/Errores/N_Error');
    const { LPrimitivo } = require('../build/Literal/Primitivo');
    const { Tipos, Tipo, TipoDato } = require('../build/Otros/Tipos');
    const { Mast } = require('../build/Expresiones/Aritmeticas/Mas');

    const { Declaracion } = require('../build/Instrucciones/Declaracion');
%}

/*------------------------------------------------PARTE LEXICA--------------------------------------------------- */
%lex

%%

//Comentarios
\s+											// se ignoran espacios en blanco
"//".*										// comentario de una linea
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"  /*Comentario multilinea*/

//Tipos de Datos
"let"               return 'tk_let'
"const"             return 'tk_const'
"string"            return 'tk_string'
"number"            return 'tk_number'
"boolean"           return 'tk_boolean'
"void"              return 'tk_void'
"null"              return 'tk_null'


//Palabras Reservadas
"if"                return 'tk_if'
"else"              return 'tk_else'
"switch"            return 'tk_switch'
"case"              return 'tk_case'
"default"           return 'tk_default'
"while"             return 'tk_while'
"do"                return 'tk_do'
"for"               return 'tk_for'
"continue"          return 'tk_continue'
"return"            return 'tk_return'
"break"             return 'tk_break'
"function"          return 'tk_function'
"console.log"       return 'tk_console'
"graficar_ts"       return 'tk_graficar_ts'
"type"              return 'tk_type'
"Array"             return 'tk_array'
"push"              return 'tk_push'
"pop"               return 'tk_pop'
"length"            return 'tk_length'
"in"                return 'tk_in'
"of"                return 'tk_of'

//Relacionales
"=="    return '=='
"!="    return '!='
">="    return '>='
">"     return '>'
"<="    return '<='
"<"     return '<' 


//Logicas
"&&"    return '&&'
"||"    return '||'
"!"     return '!'

//Unarias de Incremento y Decremento
"++"    return '++'
"--"    return '--'


//Otros
"{"     return '{'
"}"     return '}'
";"     return ';'
"="     return '='
"("     return '('
")"     return ')'
","     return ','
":"     return ':'
"."     return '.'
"["     return '['
"]"     return ']'
"?"     return '?'


//Expresiones Regulares
"true"|"false"                     return 'tk_bool'
[0-9]+"."[0-9]+                    return 'tk_decimal'
[0-9]+                             return 'tk_entero'
[\"|\']([^\"\n]|(\\\"))*[\"|\']    return 'tk_cadena'
([a-zA-Z])[a-zA-Z0-9_ñÑ]*	       return 'tk_id';


//Operaciones Aritmeticas
"**"    return '**'
"+"     return '+'
"-"     return '-'
"*"     return '*'
"/"     return '/'
"%"     return '%'

[ \t\r\n\f]                    %{ /*se ignoran*/ %}

<<EOF>>                        %{  return 'EOF';   %}

.                               {CL_Error.L_Errores.push(new CN_Error.N_Error("Lexico",yytext,"",yylineno,yylloc.first_column));}

/lex
%left '?'
%left '++' '--'
%left '||'
%left '&&'
%left '==', '!='
%nonassoc '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'
%left '**' '%'
%right '!'



%right UMENOS UMAS

/*------------------------------------------------PARTE SINTACTICA--------------------------------------------------- */

%start START
%% 

START:
    LInstrucciones EOF                  {return $1;}            
;

LInstrucciones:
    LInstrucciones Instruccion          {$1.push($2); $$ = $1;}
    | Instruccion                       {$$ = [$1];}
;

Instruccion:
    Declaracion             {$$=$1;}
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en la Instruccion "+yytext,"",this._$.first_line,this._$.first_column));}
;

Declaracion:
    tk_let tk_id Tipodeclaracion Posiblearray PosibleAsignacion ';'
    {
        $$ = new Declaracion(TipoDato.LET, $2, $3, $4, $5, @1.first_line, @1.first_column);
    }
    | tk_const tk_id Tipodeclaracion Posiblearray PosibleAsignacion ';'  
    {
        $$ = new Declaracion(TipoDato.CONST, $2, $3, $4, $5, @1.first_line, @1.first_column);
    }
;

Tipodeclaracion:
    ':' tk_number                       { $$ = new Tipo(Tipos.NUMBER); }
    | ':' tk_string                     { $$ = new Tipo(Tipos.STRING); }
    | ':' tk_boolean                    { $$ = new Tipo(Tipos.BOOLEAN); }
    | ':' tk_void                       { $$ = new Tipo(Tipos.NULL); }
    | ':' tk_id                         { $$ = new Tipo(Tipos.TYPE, $2); }
    | ':' tk_array '<' TipoDato '>'     { $$ = new Tipo(Tipos.ARRAY, $4); }
    | %empty                            { $$ = null; } 
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error al definir tipo "+yytext,"",this._$.first_line,this._$.first_column))}
;

Posiblearray:
    arrayllaves                         { $$ = $1; }
    | %empty                            { $$ = null; } 
;

arrayllaves:
    arrayllaves '[' ']'
    {
    }
    | '['']'
    {
    }  
;

PosibleAsignacion:
    '=' Expresion                       { $$ = $2; }
    | %empty                            { $$ = null; } 
;

Expresion:
    '(' Expresion ')'       {$$=$2;}
    | OpeTernario           {$$=$1;}
    | E_aritmetica          {$$=$1;}
    | E_relacional          {$$=$1;}
    | E_logica              {$$=$1;}
    | Factor                {$$=$1;}
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en la expresion "+yytext,"",this._$.first_line,this._$.first_column));}
;

OpeTernario:
    Expresion '?' Expresion ':' Expresion 
    {
    }
;

E_aritmetica:
    Expresion '+' Expresion
    {
        $$ = new Mast($1, $3, @1.first_line, @1.first_column);
    }
    | Expresion '-' Expresion
    {

    }
    | Expresion '*' Expresion
    {

    }
    | Expresion '/' Expresion
    {

    }
    | Expresion '**' Expresion
    {

    }
    | Expresion '%' Expresion
    {

    }
    | '-' Expresion %prec UMENOS
    {

    }
    | '+' Expresion %prec UMAS
    {

    }
;

E_relacional:
    Expresion '>' Expresion
    {

    }
    | Expresion '<' Expresion
    {

    }
    | Expresion '>=' Expresion
    {

    }
    | Expresion '<=' Expresion
    {

    }
    | Expresion '==' Expresion
    {

    }
    | Expresion '!=' Expresion
    {

    }
;

E_logica:
    Expresion '&&' Expresion
    {

    }
    | Expresion '||' Expresion
    {

    }
    | '!' Expresion
    {

    }
;

Factor:
    tk_entero
    { 
        $$ = new LPrimitivo($1, Tipos.NUMBER, @1.first_line, @1.first_column);
    }
    | tk_decimal
    { 
        $$ = new LPrimitivo($1, Tipos.NUMBER, @1.first_line, @1.first_column);
    }
    | tk_cadena
    {

    }
    | tk_bool
    { 
        $$ = new LPrimitivo($1, Tipos.BOOLEAN, @1.first_line, @1.first_column);
    }
    | tk_null
    {
        $$ = new LPrimitivo($1, Tipos.NULL, @1.first_line, @1.first_column);
    }
    | tk_id
    {

    }
;

TipoDato:
    tk_number                       {$$ = "number";}
    | tk_string                     {$$ = "string";}
    | tk_boolean                    {$$ = "boolean";}
    | tk_void                       {$$ = "void";}
    | tk_id                         {$$ = $1;}
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error al definir tipo "+yytext,"",this._$.first_line,this._$.first_column))}
;
