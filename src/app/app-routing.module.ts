import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Rutas
import { ErroresComponent } from "./components/errores/errores.component";
import { HomeComponent } from "./components/home/home.component";
import { TbsimbolosComponent } from "./components/tbsimbolos/tbsimbolos.component";
import { OptimizacionComponent } from "./components/optimizacion/optimizacion.component";

const routes: Routes = [
  {
    path: 'errores',
    component: ErroresComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'simb',
    component: TbsimbolosComponent
  },
  {
    path: 'opt',
    component: OptimizacionComponent  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
