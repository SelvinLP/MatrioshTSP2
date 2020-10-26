import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { L_Errores } from "../../../../Backend/build/Errores/L_Error";
import { L_Simbs } from "../../../../Backend/build/Otros/L_Simb";
import { Generador } from "../../../../Backend/build/Generador/Generador";
import { N_Ast } from "../../../../Backend/build/Ast/Ast";
import { Entorno } from "../../../../Backend/build/Entorno/Entorno";
import { Func_native } from "../../../../Backend/build/Generador/FuncNativas";
import Parser from "../../../../Backend/Gramatica/Gramatica";


import { graphviz }  from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {}

  Entrada = "";
  Salida = "";
  Consola = "";
  CadenaGraphviz = "";
  ast;

  options: any = {
    lineNumbers: true,
    theme:'mbo',
    lineWrapping: false,
    indentWithTabs: true,
    mode: 'javascript',
    styleActiveLine: true,
  };

  Ev_Traducir(){
    this.Consola = "";
    L_Errores.splice(0, L_Errores.length);
    L_Simbs.splice(0, L_Simbs.length);
    const entorno = new Entorno(null);
    let gener = Generador.getInstancia();
    gener.limpiartodo();
    this.ast = Parser.parse(this.Entrada);
    //mandamos a imprimir el codigo nuevo
    this.Inst_Print(entorno);
  }

  Ev_Ejecutar(){
    this.Consola="";
  }

  Inst_Print(entorno:Entorno){
    //Imprimimos el encabezado
    let nativa= new Func_native();
    let cadtem = ""; 
    cadtem += "#include <stdio.h> \n";
    cadtem += "#include <math.h> \n";
    cadtem += "double heap[16384]; \n";
    cadtem += "double stack[16384]; \n";
    cadtem += "double p; \n";
    cadtem += "double h; \n";
    let gener = Generador.getInstancia();
    let temimprimir = nativa.getImprimircad();
    let cad_str_str = nativa.concat_string_string();
    let cmp_str = nativa.compare_str_str();
    let nat_pot = nativa.getpot();
    let cad_num_str = nativa.concat_num_str();

    let imprimirtrue = nativa.getImprimirctrue();
    let imprimirfalse = nativa.getImprimircfalse();
    let imprimirnull = nativa.getImprimircnull();
    //ejecutamos traduccion
    for(const Instruccion of this.ast){
      try {
        const valor=Instruccion.ejecutar(entorno);
      } catch (err) {
        L_Errores.push(err);
      }
    }
    //Obtenemos los temporales
    cadtem += "double ";
    cadtem += "T" + 0;
    for(let pos = 1; pos < gener.temporal; pos++){
      cadtem += "," + "T" + pos;
    }
    cadtem += "; \n";
    cadtem += "void main() { \n";
    //Intrucciones de Imprimir
    for(let datos of gener.codigo){
      cadtem += "  " + datos + '\n';
    }
    cadtem += "  return; \n";
    cadtem += "}\n";
    //agregamos funciones nativas
    cadtem += "/**** FUNCIONES NATIVAS ****/\n";
    cadtem += temimprimir;
    cadtem += cad_str_str;
    cadtem += cmp_str;
    cadtem += nat_pot;
    cadtem += cad_num_str;
    cadtem += imprimirtrue;
    cadtem += imprimirfalse;
    cadtem += imprimirnull;
    this.Consola = cadtem;
  }

  Ev_Ast(){
    this.CadenaGraphviz = "digraph AST {\n rankdir=TB;\n node[shape=record,style=filled];\n";
    this.CadenaGraphviz+="1 [label =\"Inicio\"]; ";
    let inicio:N_Ast ={posant:1, posdes:2, cadena:""};
    let cadenainst:N_Ast;
    for(const Instruccion of this.ast){
      cadenainst = Instruccion.ejecutarast(inicio);
      inicio.posdes=cadenainst.posdes;
      inicio.cadena=cadenainst.cadena;
    }
    this.CadenaGraphviz+=cadenainst.cadena;
    this.CadenaGraphviz+="}\n";
    wasmFolder('assets/');
    graphviz('body').renderDot(this.CadenaGraphviz);
  }
  
  Ev_Simbolos(){
    this.router.navigate(['/simb']);
    wasmFolder('assets/');
    graphviz('body').renderDot('digraph AST {}');
  }
  
  Ev_Errores(){
    this.router.navigate(['/errores']);
    wasmFolder('assets/');
    graphviz('body').renderDot('digraph AST {}');
  }

}
