/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var Gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[1,7],$V3=[2,5,8,14],$V4=[13,25,27],$V5=[2,14],$V6=[1,14],$V7=[1,13],$V8=[13,27],$V9=[2,17],$Va=[1,18],$Vb=[2,21],$Vc=[1,27],$Vd=[1,40],$Ve=[1,49],$Vf=[1,34],$Vg=[1,42],$Vh=[1,41],$Vi=[1,43],$Vj=[1,44],$Vk=[1,45],$Vl=[1,46],$Vm=[1,47],$Vn=[1,48],$Vo=[1,67],$Vp=[1,66],$Vq=[1,59],$Vr=[1,60],$Vs=[1,61],$Vt=[1,62],$Vu=[1,63],$Vv=[1,64],$Vw=[1,65],$Vx=[1,68],$Vy=[1,69],$Vz=[1,70],$VA=[1,71],$VB=[1,72],$VC=[1,73],$VD=[13,15,21,23,30,36,37,38,39,40,41,42,43,44,45,46,47,48],$VE=[13,15,21,23,30,36,37,38,43,44,45,46,47,48],$VF=[13,15,21,23,30,36,37,38,39,40,43,44,45,46,47,48],$VG=[13,15,30,36,45,46,47,48];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"LInstrucciones":4,"EOF":5,"Instruccion":6,"Declaracion":7,"tk_let":8,"tk_id":9,"Tipodeclaracion":10,"Posiblearray":11,"PosibleAsignacion":12,";":13,"tk_const":14,":":15,"tk_number":16,"tk_string":17,"tk_boolean":18,"tk_void":19,"tk_array":20,"<":21,"TipoDato":22,">":23,"arrayllaves":24,"[":25,"]":26,"=":27,"Expresion":28,"(":29,")":30,"OpeTernario":31,"E_aritmetica":32,"E_relacional":33,"E_logica":34,"Factor":35,"?":36,"+":37,"-":38,"*":39,"/":40,"**":41,"%":42,">=":43,"<=":44,"==":45,"!=":46,"&&":47,"||":48,"!":49,"tk_entero":50,"tk_decimal":51,"tk_cadena":52,"tk_bool":53,"tk_null":54,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"tk_let",9:"tk_id",13:";",14:"tk_const",15:":",16:"tk_number",17:"tk_string",18:"tk_boolean",19:"tk_void",20:"tk_array",21:"<",23:">",25:"[",26:"]",27:"=",29:"(",30:")",36:"?",37:"+",38:"-",39:"*",40:"/",41:"**",42:"%",43:">=",44:"<=",45:"==",46:"!=",47:"&&",48:"||",49:"!",50:"tk_entero",51:"tk_decimal",52:"tk_cadena",53:"tk_bool",54:"tk_null"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[7,6],[7,6],[10,2],[10,2],[10,2],[10,2],[10,2],[10,5],[10,0],[10,1],[11,1],[11,0],[24,3],[24,2],[12,2],[12,0],[28,3],[28,1],[28,1],[28,1],[28,1],[28,1],[28,1],[31,5],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,2],[32,2],[33,3],[33,3],[33,3],[33,3],[33,3],[33,3],[34,3],[34,3],[34,2],[35,1],[35,1],[35,1],[35,1],[35,1],[35,1],[22,1],[22,1],[22,1],[22,1],[22,1],[22,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
$$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3:
this.$ = [$$[$0]];
break;
case 4: case 23: case 24: case 25: case 26: case 27:
this.$=$$[$0];
break;
case 5:
CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en la Instruccion "+yytext,"",this._$.first_line,this._$.first_column));
break;
case 6:

        this.$ = new Declaracion(TipoDato.LET, $$[$0-4], $$[$0-3], $$[$0-2], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column);
    
break;
case 7:

        this.$ = new Declaracion(TipoDato.CONST, $$[$0-4], $$[$0-3], $$[$0-2], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column);
    
break;
case 8:
 this.$ = new Tipo(Tipos.NUMBER); 
break;
case 9:
 this.$ = new Tipo(Tipos.STRING); 
break;
case 10:
 this.$ = new Tipo(Tipos.BOOLEAN); 
break;
case 11:
 this.$ = new Tipo(Tipos.NULL); 
break;
case 12:
 this.$ = new Tipo(Tipos.TYPE, $$[$0]); 
break;
case 13:
 this.$ = new Tipo(Tipos.ARRAY, $$[$0-1]); 
break;
case 15: case 58:
CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error al definir tipo "+yytext,"",this._$.first_line,this._$.first_column))
break;
case 16: case 20:
 this.$ = $$[$0]; 
break;
case 18: case 19: case 29:

    
break;
case 22:
this.$=$$[$0-1];
break;
case 28:
CL_Error.L_Errores.push(new CN_Error.N_Error("Sintactico","Error en la expresion "+yytext,"",this._$.first_line,this._$.first_column));
break;
case 30:

        this.$ = new Mast($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
    
break;
case 31: case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40: case 41: case 42: case 43: case 44: case 45: case 46: case 49: case 52:


    
break;
case 47: case 48:
 
        this.$ = new LPrimitivo($$[$0], Tipos.NUMBER, _$[$0].first_line, _$[$0].first_column);
    
break;
case 50:
 
        this.$ = new LPrimitivo($$[$0], Tipos.BOOLEAN, _$[$0].first_line, _$[$0].first_column);
    
break;
case 51:

        this.$ = new LPrimitivo($$[$0], Tipos.NULL, _$[$0].first_line, _$[$0].first_column);
    
break;
case 53:
this.$ = "number";
break;
case 54:
this.$ = "string";
break;
case 55:
this.$ = "boolean";
break;
case 56:
this.$ = "void";
break;
case 57:
this.$ = $$[$0];
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:4,8:$V1,14:$V2},{1:[3]},{2:$V0,5:[1,8],6:9,7:4,8:$V1,14:$V2},o($V3,[2,3]),o($V3,[2,4]),o($V3,[2,5]),{9:[1,10]},{9:[1,11]},{1:[2,1]},o($V3,[2,2]),o($V4,$V5,{10:12,2:$V6,15:$V7}),o($V4,$V5,{10:15,2:$V6,15:$V7}),o($V8,$V9,{11:16,24:17,25:$Va}),{9:[1,23],16:[1,19],17:[1,20],18:[1,21],19:[1,22],20:[1,24]},o($V4,[2,15]),o($V8,$V9,{24:17,11:25,25:$Va}),{12:26,13:$Vb,27:$Vc},o($V8,[2,16],{25:[1,28]}),{26:[1,29]},o($V4,[2,8]),o($V4,[2,9]),o($V4,[2,10]),o($V4,[2,11]),o($V4,[2,12]),{21:[1,30]},{12:31,13:$Vb,27:$Vc},{13:[1,32]},{2:$Vd,9:$Ve,28:33,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{26:[1,50]},o($V4,[2,19]),{2:[1,57],9:[1,56],16:[1,52],17:[1,53],18:[1,54],19:[1,55],22:51},{13:[1,58]},o($V3,[2,6]),{13:[2,20],21:$Vo,23:$Vp,36:$Vq,37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw,43:$Vx,44:$Vy,45:$Vz,46:$VA,47:$VB,48:$VC},{2:$Vd,9:$Ve,28:74,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},o($VD,[2,23]),o($VD,[2,24]),o($VD,[2,25]),o($VD,[2,26]),o($VD,[2,27]),o($VD,[2,28]),{2:$Vd,9:$Ve,28:75,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:76,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:77,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},o($VD,[2,47]),o($VD,[2,48]),o($VD,[2,49]),o($VD,[2,50]),o($VD,[2,51]),o($VD,[2,52]),o($V4,[2,18]),{23:[1,78]},{23:[2,53]},{23:[2,54]},{23:[2,55]},{23:[2,56]},{23:[2,57]},{23:[2,58]},o($V3,[2,7]),{2:$Vd,9:$Ve,28:79,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:80,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:81,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:82,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:83,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:84,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:85,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:86,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:87,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:88,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:89,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:90,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:91,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:92,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{2:$Vd,9:$Ve,28:93,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},{21:$Vo,23:$Vp,30:[1,94],36:$Vq,37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw,43:$Vx,44:$Vy,45:$Vz,46:$VA,47:$VB,48:$VC},o($VD,[2,36]),o($VD,[2,37]),o($VD,[2,46]),o($V4,[2,13]),{15:[1,95],21:$Vo,23:$Vp,36:$Vq,37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw,43:$Vx,44:$Vy,45:$Vz,46:$VA,47:$VB,48:$VC},o($VE,[2,30],{39:$Vt,40:$Vu,41:$Vv,42:$Vw}),o($VE,[2,31],{39:$Vt,40:$Vu,41:$Vv,42:$Vw}),o($VF,[2,32],{41:$Vv,42:$Vw}),o($VF,[2,33],{41:$Vv,42:$Vw}),o($VD,[2,34]),o($VD,[2,35]),o($VG,[2,38],{37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw}),o($VG,[2,39],{37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw}),o($VG,[2,40],{37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw}),o($VG,[2,41],{37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw}),o($VG,[2,42],{21:$Vo,23:$Vp,37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw,43:$Vx,44:$Vy}),o($VG,[2,43],{21:$Vo,23:$Vp,37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw,43:$Vx,44:$Vy}),o([13,15,30,36,47,48],[2,44],{21:$Vo,23:$Vp,37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw,43:$Vx,44:$Vy,45:$Vz,46:$VA}),o([13,15,30,36,48],[2,45],{21:$Vo,23:$Vp,37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw,43:$Vx,44:$Vy,45:$Vz,46:$VA,47:$VB}),o($VD,[2,22]),{2:$Vd,9:$Ve,28:96,29:$Vf,31:35,32:36,33:37,34:38,35:39,37:$Vg,38:$Vh,49:$Vi,50:$Vj,51:$Vk,52:$Vl,53:$Vm,54:$Vn},o([13,15,30,36],[2,29],{21:$Vo,23:$Vp,37:$Vr,38:$Vs,39:$Vt,40:$Vu,41:$Vv,42:$Vw,43:$Vx,44:$Vy,45:$Vz,46:$VA,47:$VB,48:$VC})],
defaultActions: {8:[2,1],52:[2,53],53:[2,54],54:[2,55],55:[2,56],56:[2,57],57:[2,58]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    const CL_Error = require('../build/Errores/L_Error');
    const CN_Error = require('../build/Errores/N_Error');
    const { LPrimitivo } = require('../build/Literal/Primitivo');
    const { Tipos, Tipo, TipoDato } = require('../build/Otros/Tipos');
    const { Mast } = require('../build/Expresiones/Aritmeticas/Mas');

    const { Declaracion } = require('../build/Instrucciones/Declaracion');
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:// se ignoran espacios en blanco
break;
case 1:// comentario de una linea
break;
case 2:/*Comentario multilinea*/
break;
case 3:return 8
break;
case 4:return 14
break;
case 5:return 17
break;
case 6:return 16
break;
case 7:return 18
break;
case 8:return 19
break;
case 9:return 54
break;
case 10:return 'tk_if'
break;
case 11:return 'tk_else'
break;
case 12:return 'tk_switch'
break;
case 13:return 'tk_case'
break;
case 14:return 'tk_default'
break;
case 15:return 'tk_while'
break;
case 16:return 'tk_do'
break;
case 17:return 'tk_for'
break;
case 18:return 'tk_continue'
break;
case 19:return 'tk_return'
break;
case 20:return 'tk_break'
break;
case 21:return 'tk_function'
break;
case 22:return 'tk_console'
break;
case 23:return 'tk_graficar_ts'
break;
case 24:return 'tk_type'
break;
case 25:return 20
break;
case 26:return 'tk_push'
break;
case 27:return 'tk_pop'
break;
case 28:return 'tk_length'
break;
case 29:return 'tk_in'
break;
case 30:return 'tk_of'
break;
case 31:return 45
break;
case 32:return 46
break;
case 33:return 43
break;
case 34:return 23
break;
case 35:return 44
break;
case 36:return 21 
break;
case 37:return 47
break;
case 38:return 48
break;
case 39:return 49
break;
case 40:return '++'
break;
case 41:return '--'
break;
case 42:return '{'
break;
case 43:return '}'
break;
case 44:return 13
break;
case 45:return 27
break;
case 46:return 29
break;
case 47:return 30
break;
case 48:return ','
break;
case 49:return 15
break;
case 50:return '.'
break;
case 51:return 25
break;
case 52:return 26
break;
case 53:return 36
break;
case 54:return 53
break;
case 55:return 51
break;
case 56:return 50
break;
case 57:return 52
break;
case 58:return 9;
break;
case 59:return 41
break;
case 60:return 37
break;
case 61:return 38
break;
case 62:return 39
break;
case 63:return 40
break;
case 64:return 42
break;
case 65: /*se ignoran*/ 
break;
case 66:  return 5;   
break;
case 67:CL_Error.L_Errores.push(new CN_Error.N_Error("Lexico",yy_.yytext,"",yy_.yylineno,yy_.yylloc.first_column));
break;
}
},
rules: [/^(?:\s+)/,/^(?:\/\/.*)/,/^(?:\/\*\/*([^*/]|[^*]\/|\*[^/])*\**\*\/)/,/^(?:let\b)/,/^(?:const\b)/,/^(?:string\b)/,/^(?:number\b)/,/^(?:boolean\b)/,/^(?:void\b)/,/^(?:null\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:continue\b)/,/^(?:return\b)/,/^(?:break\b)/,/^(?:function\b)/,/^(?:console\.log\b)/,/^(?:graficar_ts\b)/,/^(?:type\b)/,/^(?:Array\b)/,/^(?:push\b)/,/^(?:pop\b)/,/^(?:length\b)/,/^(?:in\b)/,/^(?:of\b)/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:>)/,/^(?:<=)/,/^(?:<)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\{)/,/^(?:\})/,/^(?:;)/,/^(?:=)/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?::)/,/^(?:\.)/,/^(?:\[)/,/^(?:\])/,/^(?:\?)/,/^(?:true|false\b)/,/^(?:[0-9]+\.[0-9]+)/,/^(?:[0-9]+)/,/^(?:[\"|\']([^\"\n]|(\\"))*[\"|\'])/,/^(?:([a-zA-Z])[a-zA-Z0-9_ñÑ]*)/,/^(?:\*\*)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:[ \t\r\n\f])/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = Gramatica;
exports.Parser = Gramatica.Parser;
exports.parse = function () { return Gramatica.parse.apply(Gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}