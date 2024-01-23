import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExportComponent } from './export/export.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { AnalysisComponent } from './analysis/analysis.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'export', component: ExportComponent},
  {path: 'addstudent', component: AddstudentComponent},
  {path: 'analysis', component: AnalysisComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
