import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {

  excelData: any;
  form = new FormGroup({
    'admin_no': new FormControl(null),
    'athlete_name': new FormControl(null),
    'cca': new FormControl(null),
    'gender': new FormControl('Male'),
    'date_of_birth': new FormControl(null)
  });

  constructor(private firestore: AngularFirestore) { }

  readExcel(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])
    }
  }

  csvImport() {
    let wrongFormatCount = 0

    for (let student of this.excelData) {
      if (!(
        (Object.keys(student).length == 5) &&
        (student.admin_no != undefined) &&
        (student.athlete_name != undefined) &&
        (student.gender != undefined) &&
        (student.date_of_birth != undefined) &&
        (student.cca != undefined)
      )) {
        wrongFormatCount = wrongFormatCount + 1
      }
    }

    if (wrongFormatCount != 0) {
      alert(
        'Importing failed.\n'+
        wrongFormatCount.toString()+' out of '+this.excelData.length+' data are in the wrong format.\n\n'+
        'Data should only have 5 fields:\n'+
        "'admin_no', 'athlete_name', 'gender', 'date_of_birth', and 'cca'.\n\n"+
        'All fields must be filled.'
        )
      return
    }

    for (let student of this.excelData) {
      this.firestore.collection('athletes').add({
        admin_no: student.admin_no,
        athlete_name: student.athlete_name,
        gender: student.gender.charAt(0).toUpperCase() + student.gender.slice(1),
        date_of_birth: new Date(student.date_of_birth.split("/")[2], student.date_of_birth.split("/")[1] - 1, student.date_of_birth.split("/")[0]).toISOString().split('T')[0],
        cca: student.cca.charAt(0).toUpperCase() + student.cca.slice(1),
      });
    }
    alert(this.excelData.length+' athlete data has been added succesfully');
  }

  individualImport() {
    let blankFlag = false

    document.getElementById('admin_no')?.classList.remove('is-invalid');
    document.getElementById('athlete_name')?.classList.remove('is-invalid');
    document.getElementById('cca')?.classList.remove('is-invalid');
    document.getElementById('date_of_birth')?.classList.remove('is-invalid');

    if (this.form.value.admin_no == undefined || this.form.value.admin_no == '') {
      document.getElementById('admin_no')?.classList.add('is-invalid');
      blankFlag = true
    }
    if (this.form.value.athlete_name == undefined || this.form.value.athlete_name == '') {
      document.getElementById('athlete_name')?.classList.add('is-invalid');
      blankFlag = true
    }
    if (this.form.value.cca == undefined || this.form.value.cca == '') {
      document.getElementById('cca')?.classList.add('is-invalid');
      blankFlag = true
    }
    if (this.form.value.date_of_birth as any == undefined || this.form.value.date_of_birth as any == '' || !this.dateValidator()) {
      document.getElementById('date_of_birth')?.classList.add('is-invalid');
      blankFlag = true
    }

    if (blankFlag == true){
      return
    }

    this.firestore.collection('athletes').add({
      admin_no: this.form.value.admin_no,
      athlete_name: this.form.value.athlete_name,
      gender: this.form.value.gender,
      cca: this.form.value.cca,
      date_of_birth: new Date((this.form.value.date_of_birth as any).year.toString() + '-' + (this.form.value.date_of_birth as any).month.toString() + '-' + (this.form.value.date_of_birth as any).day.toString()).toISOString().split('T')[0]
    });
    alert('Athlete data has been added succesfully');
    
    this.form.controls.admin_no.reset()
    this.form.controls.athlete_name.reset()
    this.form.controls.gender.reset()
    this.form.controls.cca.reset()
    this.form.controls.date_of_birth.reset()
  }

  dateValidator() {
    if (
      (this.form.value.date_of_birth as any).year != undefined && 
      (this.form.value.date_of_birth as any).month != undefined && 
      (this.form.value.date_of_birth as any).day != undefined
      ) {
        return true
    }
    return false
  }


}
