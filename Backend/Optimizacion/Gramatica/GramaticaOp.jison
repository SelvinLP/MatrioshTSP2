
%{
    const CL_Error = require('../../build/Errores/L_Error');
    const CN_Error = require('../../build/Errores/N_Error');

    const { Opearitmetica } = require('../../build/Optimizacion/Opearitmetica');
    const { InstrucionesOp } = require('../../build/Optimizacion/Instrucciones');
    const { FuncOp } = require('../../build/Optimizacion/FuncOp');
    const { RetornoOp } = require('../../build/Optimizacion/RetornoOp');

%}

/*------------------------------------------------PARTE LEXICA--------------------------------------------------- */
%lex

%%

//Comentarios
\s+											// se ignoran espacios en blanco
"//".*										// comentario de una linea
"/*""/"*([^*/]|[^*]"/"|"*"[^/])*"*"*"*/"  /*Comentario multilinea*/

//Tipos de Datos
"double"                return 'tk_double'
"int"                   return 'tk_int'
"void"                  return 'tk_void'
"return"                return 'tk_return'

//Palabras Reservadas
"if"                return 'tk_if'
"else"              return 'tk_else'


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
"="    return '='


//Expresiones Regulares
"T"([0-9])+                        return 'tk_terminal'
[0-9]+"."[0-9]+                    return 'tk_decimal'
[0-9]+                             return 'tk_entero'
[\"|\']([^\"\n]|(\\\"))*[\"|\']    { yytext = yytext.slice(1,-1).replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\r/g, "\r").replace(/\\\\/g, "\\").replace(/\\\"/g, "\""); return 'tk_cadena';}
([a-zA-Z_])[a-zA-Z0-9_ñÑ]*         return 'tk_id'; 


//Operaciones Aritmeticas
"**"    return '**'
"+"     return '+'
"-"     return '-'
"*"     return '*'
"/"     return '/'
"%"     return '%'

[\t\r\n\f]                    %{ /*se ignoran*/ %}

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
%nonassoc '.'

%right UMENOS UMAS

/*------------------------------------------------PARTE SINTACTICA--------------------------------------------------- */

%start START
%% 

START:
    Encabezado EOF                  {return $1;}            
;

Encabezado:
    Encabezado Funciones                                  
    {
        $1.push($2); 
        $$ = $1;
    }
    | Funciones  
    {
        $$ = [$1];
    }
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en el encabezado"+yytext,"",this._$.first_line,this._$.first_column));}
;

Funciones:
    tk_int tk_id '(' ')' Cuerpo 
    {
        $$ = new FuncOp($1, $2, $5, @1.first_line);
    }
    | tk_void tk_id '(' ')' Cuerpo 
    {
        $$ = new FuncOp($1, $2, $5, @1.first_line);
    }
;

Cuerpo:
    '{' LInstrucciones '}' 
    {
        $$ = new InstrucionesOp($2, @1.first_line);
    }
    | '{' '}' 
    {
        $$ = new InstrucionesOp(new Array(), @1.first_line);
    }
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en las llaves {} "+yytext,"",this._$.first_line,this._$.first_column));}
;

LInstrucciones:
    LInstrucciones Instruccion          
    {
        $1.push($2); 
        $$ = $1;
    }
    | Instruccion                       
    {
        $$ = [$1];
    }
;

Instruccion:
    Expresiones
    {
        $$ = $1;
    }
    | Returnt
    {
        $$ = $1;
    }
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en la Instruccion "+yytext,"",this._$.first_line,this._$.first_column));}
;

Expresiones:
    tk_terminal '=' Factor '+' Factor ';'
    {
        $$ = new Opearitmetica($1, $3, $4, $5,@1.first_line);
    }
    | tk_terminal '=' Factor '-' Factor ';'
    {
        $$ = new Opearitmetica($1, $3, $4, $5,@1.first_line);
    }
    | tk_terminal '=' Factor '*' Factor ';'
    {
        $$ = new Opearitmetica($1, $3, $4, $5,@1.first_line);
    }
    | tk_terminal '=' Factor '/' Factor ';'
    {
        $$ = new Opearitmetica($1, $3, $4, $5,@1.first_line);
    }
;

Factor:
    tk_terminal
    {
        $$ = $1;
    }
    | tk_entero
    {
        $$ = +$1;
    }
    | tk_decimal
    {
        $$ = +$1;
    }
    | tk_id
    {
        $$ = $1;
    }
;

Returnt:
    tk_return tk_entero ';'
    {
        $$ = new RetornoOp($2, @1.first_line);
    }
    | tk_return ';'
    {
        $$ = new RetornoOp("", @1.first_line);
    }
;
