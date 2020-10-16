import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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

  Entrada="";
  Salida="";
  Consola="";
  CadenaGraphviz="";
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
    this.Salida=this.Entrada
    this.Consola="";

  }

  Ev_Ejecutar(){
    this.Consola="";
  }

  Inst_Print(){
    //Intrucciones de Imprimir
  }

  Ev_Ast(){
    //console.log(this.CadenaGraphviz);
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
