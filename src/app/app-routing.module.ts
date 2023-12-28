import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodycompComponent } from './Stations/bodycomp/bodycomp.component';
import { HomeComponent } from './home/home.component';
import { VertjumpComponent } from './Stations/vertjump/vertjump.component';
import { MedicineballComponent } from './Stations/medicineball/medicineball.component';
import { AgilityComponent } from './Stations/agility/agility.component';
import { SprintComponent } from './Stations/sprint/sprint.component';
import { InterrecoveryComponent } from './Stations/interrecovery/interrecovery.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'body', component: BodycompComponent},
  {path: 'vert', component: VertjumpComponent},
  {path: 'medi', component: MedicineballComponent},
  {path: 'ill', component: AgilityComponent},
  {path: 'ana', component: SprintComponent},
  {path: 'inter', component: InterrecoveryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
