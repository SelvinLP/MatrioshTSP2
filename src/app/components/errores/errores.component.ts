import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ErroresComponent implements OnInit {

  constructor(public router: Router) {
   }

  ngOnInit(): void {
  }
  
  Ev_Mostrar(){
  }
  Ev_Regresar(){
    this.router.navigate(['/']);
  }
}
