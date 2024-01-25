import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportComponent } from './import/import.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

const firebaseConfig = {
  apiKey: "AIzaSyDDkCipkP-5QWmaEr70Kz9Hink-f0e_bH8",
  authDomain: "tpsportsperformanceapp-b59b8.firebaseapp.com",
  projectId: "tpsportsperformanceapp-b59b8",
  storageBucket: "tpsportsperformanceapp-b59b8.appspot.com",
  messagingSenderId: "886699209939",
  appId: "1:886699209939:web:3458b83c0fe003617e9026"
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    ImportComponent,
   
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
