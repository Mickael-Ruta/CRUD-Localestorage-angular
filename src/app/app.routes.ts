import { Routes } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { AjoutComponent } from './ajout/ajout.component';

export const routes: Routes = [
  {path : 'liste' ,component : ListeComponent},
  {path : '',redirectTo : 'liste',pathMatch:'full'},
  {path: 'ajout' ,component : AjoutComponent},
  {path : 'liste/:matricule/edit',component: AjoutComponent}
];
