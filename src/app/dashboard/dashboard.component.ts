import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  
  currentTestType: any;
  athletesData: any;
  visibleAthleteData: any;
  subscription: Subscription;
  form = new FormGroup({
    'filter': new FormControl('')
  });

  constructor(private firestore: AngularFirestore){}
  
  ngOnInit(){
    this.currentTestType = 'Base'
    this.subscription = this.firestore.collection('athletes').snapshotChanges().subscribe(snapshots => {
      this.athletesData = snapshots.map(snapshot => {
        const id = snapshot.payload.doc.id;
        const data = snapshot.payload.doc.data() as { [key: string]: any };
        return { id, ...data };
      });
      this.athletesData.sort((a: any, b: any) => a.athlete_name.localeCompare(b.athlete_name));
      
      this.dataFilter()
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
        let athleteIdList = []

        for (let athleteDetails of this.athletesData) {
          if (athleteDetails.admin_no == athlete.admin_no)
          athleteIdList.push(athleteDetails.id)
        }
        
        try{
          for (let id of athleteIdList){
            this.firestore.doc('athletes/' + id).delete();
          }
          alert('Athlete data deleted')
        }
        catch(err){
          alert('Error occurred while deleting. Try again.')
        }
    }
  }

  deleteAll() {
    if (!confirm(
      'Are you sure you want to wipe ALL athlete data?\n'+
      'This action is non-reversable.'
    )) {return}

    if (confirm('Click on "OK" once more to wipe all athlete data.')) {
      let athleteIdList = []

      for (let athlete of this.athletesData) {
        athleteIdList.push(athlete.id)
      }
      
      for (let id of athleteIdList) {
        try{
          this.firestore.doc('athletes/' + id).delete();
        }
        catch(err){
          console.log(err)
        }
      }
      alert('Data wipe complete')
    }
  }

  dataFilter() {
    this.form.value.filter = this.form.value.filter?.toLowerCase()
    this.visibleAthleteData = []

    if (this.form.value.filter == 'male') {
      for (let athlete of this.athletesData) {
        if (
          athlete.gender.toLowerCase() == this.form.value.filter &&
          athlete.test_type == this.currentTestType
        ) {
          this.visibleAthleteData.push(athlete)
        }
      }
    }
    else {
      for (let athlete of this.athletesData) {
        if (
          (athlete.athlete_name.toLowerCase().includes(this.form.value.filter) ||
          athlete.admin_no.toLowerCase().includes(this.form.value.filter) ||
          athlete.gender.toLowerCase().includes(this.form.value.filter) ||
          athlete.date_of_birth.toLowerCase().includes(this.form.value.filter) ||
          athlete.cca.toLowerCase().includes(this.form.value.filter)) &&
          athlete.test_type == this.currentTestType
        ) {
          this.visibleAthleteData.push(athlete)
        }
      }
    }
  }

  testTypeChange(newTestType: String){
    this.currentTestType = newTestType;
    this.dataFilter()
  }

  export() {
    let exportData = this.visibleAthleteData.map((athleteData: any) => { let { id, ...rest } = athleteData; return rest;});
    let workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(exportData, {header: [
      'admin_no', 'athlete_name', 'gender', 'date_of_birth', 'cca',
      'height_cm', 'body_mass_kg', 'body_fat_percentage', 'muscle_mass_kg', 
      'vert_jump_cm_1', 'vert_jump_cm_2', 
      'med_ball_weight_kg', 'med_ball_chest_cm_1', 'med_ball_chest_cm_2', 
      'illinois_sec_1', 'illinois_sec_2', 
      'anaerobic_sec_1', 'anaerobic_sec_2', 'anaerobic_sec_3', 'anaerobic_sec_4', 'anaerobic_sec_5', 'anaerobic_sec_6', 
      'recovery_level', 
      'hand_eye_coord_1', 'hand_eye_coord_2', 
      'twenty_meter_sprint_sec_1', 'twenty_meter_sprint_sec_2'
    ]}), 'Athlete Data Sheet');

    XLSX.writeFile(workbook, 'athletes data.csv');
  }

}
