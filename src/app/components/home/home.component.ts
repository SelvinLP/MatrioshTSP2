import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { L_Errores } from "../../../../Backend/build/Errores/L_Error";
import { L_Simbs } from "../../../../Backend/build/Otros/L_Simb";
import { Generador } from "../../../../Backend/build/Generador/Generador";
import { N_Ast } from "../../../../Backend/build/Ast/Ast";
import { Entorno } from "../../../../Backend/build/Entorno/Entorno";
import { Func_native } from "../../../../Backend/build/Generador/FuncNativas";
import { Funciont } from "../../../../Backend/build/Instrucciones/Funciones/Funciont";
import Parser from "../../../../Backend/Gramatica/Gramatica";

import Parser2 from "../../../../Backend/Optimizacion/Gramatica/GramaticaOp";
import { Codigonuevo, L_Optimizacion } from "../../../../Backend/build/Optimizacion/Noptimizacion";

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

  temporal = "";
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
    //codigo para posible optimizar
    this.Salida = this.temporal;
  }

  Ev_Ejecutar(){
    Codigonuevo.splice(0, Codigonuevo.length);
    L_Optimizacion.splice(0, L_Optimizacion.length);
    let astoptimizacion = Parser2.parse(this.Salida);
    //ejecutamos funciones
    for(const Instruccion of astoptimizacion){
      Instruccion.ejecutar();
    }
    this.Salida =" ";
    for(let cadopti of Codigonuevo){
      this.Salida += cadopti + "\n";
    }
    
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
    let tostring = nativa.number_tostring();
    let tolowercase = nativa.tolowercase_str();
    let touppercase = nativa.touppercase_str();
    let length_str = nativa.getlength_str();

    let imprimirtrue = nativa.getImprimirctrue();
    let imprimirfalse = nativa.getImprimircfalse();
    let imprimirnull = nativa.getImprimircnull();
    //ejecutamos funciones
    for(const Instruccion of this.ast){
      try {
        if(Instruccion instanceof Funciont){
          Instruccion.ejecutar(entorno);
        }
      } catch (err) {
        L_Errores.push(err);
      }
    }
    let cadtem2 = "/**** FUNCIONES ****/\n";
    //Intrucciones de Imprimir funciones
    for(let datos of gener.codigo){
      cadtem2 += "  " + datos + '\n';
    }
    this.temporal = cadtem2;
    //ejecutamos traduccion
    gener.codigo = new Array();
    for(const Instruccion of this.ast){
      try {
        if(!(Instruccion instanceof Funciont)){
          Instruccion.ejecutar(entorno);
        }
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
    cadtem += "/**** FUNCIONES NATIVAS ****/\n";
    cadtem += temimprimir;
    cadtem += cad_str_str;
    cadtem += cmp_str;
    cadtem += nat_pot;
    cadtem += tostring;
    cadtem += tolowercase;
    cadtem += touppercase;
    cadtem += length_str;

    cadtem += imprimirtrue;
    cadtem += imprimirfalse;
    cadtem += imprimirnull;
    //Funciones declaradas
    cadtem += cadtem2
    cadtem += "/**** MAIN ****/\n";
    cadtem += "int main() { \n";
    this.temporal += "/**** MAIN ****/\n" + "int main() { \n";
    //Intrucciones de Imprimir
    for(let datos of gener.codigo){
      cadtem += "  " + datos + '\n';
      this.temporal += "  " + datos + '\n';
    }
    this.temporal += "  return 0; \n" +  "}\n";
    cadtem += "  return 0; \n";
    cadtem += "}\n";
    //agregamos funciones nativas

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

  Rep_Optimizar(){
    this.router.navigate(['/opt']);
    wasmFolder('assets/');
    graphviz('body').renderDot('digraph AST {}');
  }
}
