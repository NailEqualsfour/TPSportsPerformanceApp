import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent {
  athletesData: any;
  subscription: Subscription;

  constructor(private firestore: AngularFirestore){}
  
  ngOnInit(){
    this.subscription = this.firestore.collection('athletes').snapshotChanges().subscribe(snapshots => {
      this.athletesData = snapshots.map(snapshot => {
        const id = snapshot.payload.doc.id;
        const data = snapshot.payload.doc.data() as { [key: string]: any };
        return { id, ...data };
      });
      this.athletesData.sort((a: any, b: any) => a.athlete_name.localeCompare(b.athlete_name));
    });

  }
}
