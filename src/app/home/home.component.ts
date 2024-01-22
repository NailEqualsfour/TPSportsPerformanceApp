import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  @ViewChild('athleteSelect') athleteSelect: ElementRef<HTMLSelectElement>;

  currentAthlete: any;
  currentAthleteIndex: number;
  currentStation: string;
  subscription: Subscription;
  athletesData: any;
  form = new FormGroup({
    'height_cm': new FormControl(null),
    'body_mass_kg': new FormControl(null),
    'body_fat_percentage': new FormControl(null),
    'muscle_mass_kg': new FormControl(null),

    'vert_jump_cm_1': new FormControl(null),
    'vert_jump_cm_2': new FormControl(null),

    'med_ball_weight_kg': new FormControl(null),
    'med_ball_chest_cm_1': new FormControl(null),
    'med_ball_chest_cm_2': new FormControl(null),

    'illinois_sec_1': new FormControl(null),
    'illinois_sec_2': new FormControl(null),

    'anaerobic_sec_1': new FormControl(null),
    'anaerobic_sec_2': new FormControl(null),
    'anaerobic_sec_3': new FormControl(null),
    'anaerobic_sec_4': new FormControl(null),
    'anaerobic_sec_5': new FormControl(null),
    'anaerobic_sec_6': new FormControl(null),

    'recovery_level': new FormControl(null),

    'hand_eye_coord_1': new FormControl(null),
    'hand_eye_coord_2': new FormControl(null),

    'twenty_meter_sprint_sec_1': new FormControl(null),
    'twenty_meter_sprint_sec_2': new FormControl(null)
  });

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.currentAthleteIndex = 0;
    this.currentStation = "Body Composition";

    this.subscription = this.firestore.collection('athletes').snapshotChanges().subscribe(snapshots => {
      this.athletesData = snapshots.map(snapshot => {
        const id = snapshot.payload.doc.id;
        const data = snapshot.payload.doc.data() as { [key: string]: any };
        return { id, ...data };
      });
      this.athletesData.sort((a: any, b: any) => a.athlete_name.localeCompare(b.athlete_name));
      this.currentAthlete = this.athletesData[0];

      this.formRefresh()

      setTimeout(() => { 
        const selectElement = this.athleteSelect.nativeElement;
        selectElement.value = this.currentAthleteIndex.toString();
        selectElement.dispatchEvent(new Event('change'));
      });
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  formRefresh(){
    this.form.get('height_cm')?.setValue(this.currentAthlete.height_cm);
    this.form.get('body_mass_kg')?.setValue(this.currentAthlete.body_mass_kg);
    this.form.get('body_fat_percentage')?.setValue(this.currentAthlete.body_fat_percentage);
    this.form.get('muscle_mass_kg')?.setValue(this.currentAthlete.muscle_mass_kg);

    this.form.get('vert_jump_cm_1')?.setValue(this.currentAthlete.vert_jump_cm_1);
    this.form.get('vert_jump_cm_2')?.setValue(this.currentAthlete.vert_jump_cm_2);

    this.form.get('med_ball_weight_kg')?.setValue(this.currentAthlete.med_ball_weight_kg);
    this.form.get('med_ball_chest_cm_1')?.setValue(this.currentAthlete.med_ball_chest_cm_1);
    this.form.get('med_ball_chest_cm_2')?.setValue(this.currentAthlete.med_ball_chest_cm_2);

    this.form.get('illinois_sec_1')?.setValue(this.currentAthlete.illinois_sec_1);
    this.form.get('illinois_sec_2')?.setValue(this.currentAthlete.illinois_sec_2);

    this.form.get('anaerobic_sec_1')?.setValue(this.currentAthlete.anaerobic_sec_1);
    this.form.get('anaerobic_sec_2')?.setValue(this.currentAthlete.anaerobic_sec_2);
    this.form.get('anaerobic_sec_3')?.setValue(this.currentAthlete.anaerobic_sec_3);
    this.form.get('anaerobic_sec_4')?.setValue(this.currentAthlete.anaerobic_sec_4);
    this.form.get('anaerobic_sec_5')?.setValue(this.currentAthlete.anaerobic_sec_5);
    this.form.get('anaerobic_sec_6')?.setValue(this.currentAthlete.anaerobic_sec_6);

    this.form.get('recovery_level')?.setValue(this.currentAthlete.recovery_level);

    this.form.get('hand_eye_coord_1')?.setValue(this.currentAthlete.hand_eye_coord_1);
    this.form.get('hand_eye_coord_2')?.setValue(this.currentAthlete.hand_eye_coord_2);

    this.form.get('twenty_meter_sprint_sec_1')?.setValue(this.currentAthlete.twenty_meter_sprint_sec_1);
    this.form.get('twenty_meter_sprint_sec_2')?.setValue(this.currentAthlete.twenty_meter_sprint_sec_2);
  }

  athleteChange(newAthleteIndex: any){
    this.currentAthlete = this.athletesData[newAthleteIndex];
    this.currentAthleteIndex = newAthleteIndex
    this.formRefresh()
  }

  stationChange(newStation: string){
    this.currentStation = newStation;
  }

  save(){
    const athlete: any = {
      admin_no: this.currentAthlete.admin_no,
      athlete_name: this.currentAthlete.athlete_name,
      gender: this.currentAthlete.gender,
      cca: this.currentAthlete.cca,

      height_cm: this.form.value.height_cm,
      body_mass_kg: this.form.value.body_mass_kg,
      body_fat_percentage: this.form.value.body_fat_percentage,
      muscle_mass_kg: this.form.value.muscle_mass_kg,

      vert_jump_cm_1: this.form.value.vert_jump_cm_1,
      vert_jump_cm_2: this.form.value.vert_jump_cm_2,

      med_ball_weight_kg: this.form.value.med_ball_weight_kg,
      med_ball_chest_cm_1: this.form.value.med_ball_chest_cm_1,
      med_ball_chest_cm_2: this.form.value.med_ball_chest_cm_2,

      illinois_sec_1: this.form.value.illinois_sec_1,
      illinois_sec_2: this.form.value.illinois_sec_2,

      anaerobic_sec_1: this.form.value.anaerobic_sec_1,
      anaerobic_sec_2: this.form.value.anaerobic_sec_2,
      anaerobic_sec_3: this.form.value.anaerobic_sec_3,
      anaerobic_sec_4: this.form.value.anaerobic_sec_4,
      anaerobic_sec_5: this.form.value.anaerobic_sec_5,
      anaerobic_sec_6: this.form.value.anaerobic_sec_6,

      recovery_level: this.form.value.recovery_level,

      hand_eye_coord_1: this.form.value.hand_eye_coord_1,
      hand_eye_coord_2: this.form.value.hand_eye_coord_2,

      twenty_meter_sprint_sec_1: this.form.value.twenty_meter_sprint_sec_1,
      twenty_meter_sprint_sec_2: this.form.value.twenty_meter_sprint_sec_2
    }
    Object.keys(athlete).forEach(key => {
      if (athlete[key] === undefined || athlete[key] == 0) {
        delete athlete[key];
      }
    });
    this.firestore.doc('athletes/'+this.currentAthlete.id).set(athlete)
  }

  submit(){}

  currentStation = "Body Composition";

  stationChange(newStation: string) {
    this.currentStation = newStation;
  }

}
