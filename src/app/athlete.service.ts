import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  constructor(private angularFirestore: AngularFirestore){}

  getAthleteList(){
    return this.angularFirestore
    .collection("athletes")
    .snapshotChanges()
  }
  
}
