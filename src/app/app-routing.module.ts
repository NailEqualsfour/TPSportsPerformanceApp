import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImportComponent } from './import/import.component';
import { ExportComponent } from './export/export.component';
import { AddstudentComponent } from './addstudent/addstudent.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'import', component: ImportComponent},
  {path: 'export', component: ExportComponent},
  {path: 'addstudent', component: AddstudentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
