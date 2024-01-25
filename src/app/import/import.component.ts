import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {

  excelData: any;

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
        (Object.keys(student).length == 4) &&
        (student.admin_no != undefined) &&
        (student.athlete_name != undefined) &&
        (student.gender != undefined) &&
        (student.cca != undefined)
      )) {
        wrongFormatCount = wrongFormatCount + 1
      }
    }

    if (wrongFormatCount != 0) {
      alert(
        'Importing failed.\n'+
        wrongFormatCount.toString()+' out of '+this.excelData.length+' data are in the wrong format.\n\n'+
        'Data should only have 4 fields:\n'+
        "'admin_no', 'athlete_name', 'gender', and 'cca'.\n\n"+
        'All fields must be filled.'
        )
      return
    }

    for (let student of this.excelData) {
      this.firestore.collection('athletes').add({
        admin_no: student.admin_no,
        athlete_name: student.athlete_name,
        gender: student.gender,
        cca: student.cca
      });
    }
    alert(this.excelData.length+' athlete data has been added succesfully');
  }


}
