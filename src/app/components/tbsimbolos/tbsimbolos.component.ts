import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-tbsimbolos',
  templateUrl: './tbsimbolos.component.html',
  styleUrls: ['./tbsimbolos.component.css']
})
export class TbsimbolosComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  Ev_Mostrar(){
  }
  Ev_Regresar(){
    this.router.navigate(['/']);
  }
}
