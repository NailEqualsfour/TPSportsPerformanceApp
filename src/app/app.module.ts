import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { BodycompComponent } from './Stations/bodycomp/bodycomp.component';
import { HomeComponent } from './home/home.component';
import { VertjumpComponent } from './Stations/vertjump/vertjump.component';
import { MedicineballComponent } from './Stations/medicineball/medicineball.component';
import { AgilityComponent } from './Stations/agility/agility.component';
import { SprintComponent } from './Stations/sprint/sprint.component';
import { InterrecoveryComponent } from './Stations/interrecovery/interrecovery.component';
import { HandeyeComponent } from './Stations/handeye/handeye.component';
import { TwentymsprintComponent } from './Stations/twentymsprint/twentymsprint.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    BodycompComponent,
    HomeComponent,
    VertjumpComponent,
    MedicineballComponent,
    AgilityComponent,
    SprintComponent,
    InterrecoveryComponent,
    HandeyeComponent,
    TwentymsprintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
