import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  
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
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  delete(athlete: any){
    if (confirm(
      'Are you sure you want to delete athlete data?\n'+
      'This action is non-reversable.\n\n'+
      'Athlete Name: '+ athlete.athlete_name +'\n'+
      'Admin Number: '+ athlete.admin_no
      )){
        try{
          this.firestore.doc('athletes/' + athlete.id).delete();
          alert('Athlete data deleted')
        }
        catch(err){
          alert('Error occurred while deleting. Try again.')
        }
    }
  }

}
