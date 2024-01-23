import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { debounceTime } from 'rxjs/operators';
import { NgModule } from '@angular/core';

import 'firebase/firestore';

import { Chart, registerables } from 'chart.js';
import * as firebase from 'firebase/compat';
Chart.register(...registerables);

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent {
}

