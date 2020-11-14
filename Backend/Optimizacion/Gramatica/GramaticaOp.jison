
%{
    const CL_Error = require('../../build/Errores/L_Error');
    const CN_Error = require('../../build/Errores/N_Error');

    const { Opearitmetica } = require('../../build/Optimizacion/Opearitmetica');
    const { InstrucionesOp } = require('../../build/Optimizacion/Instrucciones');
    const { FuncOp } = require('../../build/Optimizacion/FuncOp');
    const { RetornoOp } = require('../../build/Optimizacion/RetornoOp');
    const { CadenaOtro } = require('../../build/Optimizacion/StackoPila');
    const { IfOp } = require('../../build/Optimizacion/Ift');

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
"stack"                 return 'tk_stack'
"heap"                  return 'tk_heap'
"if"                    return 'tk_if'
"goto"                  return 'tk_goto'


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
"printf".*";"                      return 'tk_imprimir'
"T"([0-9])+                        return 'tk_terminal'
"L"([0-9])+                        return 'tk_etiq'
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
    | Stackt
    {
        $$ = $1;
    }
    | heapt
    {
        $$ = $1;
    }
    | Returnt
    {
        $$ = $1;
    }
    | Copiat
    {
        $$ = $1;
    }
    | Ift
    {
        $$ = $1;
    }
    | Etiquetast
    {
        $$ = $1;
    }
    | Gotot
    {
        $$ = $1;
    }
    | llamarfunc
    {
        $$ = $1;
    }
    | printt
    {
        $$ = $1;
    }
    | error {CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en la Instruccion "+yytext,"",this._$.first_line,this._$.first_column));}
;

Etiquetast:
    tk_etiq ':'
    {
        tempo = new CadenaOtro($1, ":", "" , @1.first_line);
        tempo.puntoycoma = false;
        $$ = tempo;
    }
;

printt:
    tk_imprimir 
    {
        tempo = new CadenaOtro($1, "", "" , @1.first_line);
        tempo.puntoycoma = false;
        $$ = tempo;
    }
;

Gotot:
    tk_goto tk_etiq ';'
    {
        $$ = new CadenaOtro($1, $2, "" , @1.first_line);
    }
;

llamarfunc:
    tk_id '(' ')' ';'
    {
        $$ = new CadenaOtro($1, "()", "" , @1.first_line);
    }
;

Ift:
    tk_if '(' Factor Relacionalest Factor ')' Gotot Gotot Etiquetast
    {
        $$ = new IfOp($3, $4, $5, $7, $8, $9,  @1.first_line);
    }
;

Copiat:
    Factor '=' Factor ';'
    {
        $$ = new CadenaOtro($1, $2, $3 , @1.first_line);
    }
;

Stackt:
    tk_stack '[' '(' tk_int ')' Factor ']' '=' Factor ';'
    {
        temres = "stack[(int)" + $6 + "]";
        $$ = new CadenaOtro(temres, $8, $9 , @1.first_line);
    }
    | Factor '=' tk_stack '[' '(' tk_int ')' Factor ']' ';' 
    {
        temres = "stack[(int)" + $8 + "]";
        $$ = new CadenaOtro($1, $2, temres, @1.first_line);
    }
;

heapt:
    tk_heap '[' '(' tk_int ')' Factor ']' '=' Factor ';'
    {
        temres = "heap[(int)" + $6 + "]";
        $$ = new CadenaOtro(temres, $8, $9 , @1.first_line);
    }
    | Factor '=' tk_heap '[' '(' tk_int ')' Factor ']' ';' 
    {
        temres = "heap[(int)" + $8 + "]";
        $$ = new CadenaOtro($1, $2, temres, @1.first_line);
    }
;

Expresiones:
    Factor '=' Factor '+' Factor ';'
    {
        $$ = new Opearitmetica($1, $3, $4, $5,@1.first_line);
    }
    | Factor '=' Factor '-' Factor ';'
    {
        $$ = new Opearitmetica($1, $3, $4, $5,@1.first_line);
    }
    | Factor '=' Factor '*' Factor ';'
    {
        $$ = new Opearitmetica($1, $3, $4, $5,@1.first_line);
    }
    | Factor '=' Factor '/' Factor ';'
    {
        $$ = new Opearitmetica($1, $3, $4, $5,@1.first_line);
    }
;

Factor:
    tk_terminal
    {
        $$ = $1;
    }
    | '-' Factor %prec UMENOS
    {
        $$ = $2 * -1;
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

Relacionalest:
    '=='
    {
        $$ = $1;
    }
    | '!='
    {
        $$ = $1;
    }
    | '>='
    {
        $$ = $1;
    }
    | '>'
    {
        $$ = $1;
    }
    | '<='
    {
        $$ = $1;
    }
    | '<' 
    {
        $$ = $1;
    }
;