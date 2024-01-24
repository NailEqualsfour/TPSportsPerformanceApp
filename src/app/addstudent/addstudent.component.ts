import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css'
})
export class AddstudentComponent {
  ExcelData: any;

  constructor(private firestore: AngularFirestore) { }

  ReadExcel(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])
    }
  }
  onSubmit() {
    for (let student of this.ExcelData) {
      this.firestore.collection('athletes').add({
        admin_no: student.admin_no,
        athlete_name: student.athlete_name,
        gender: student.gender,
        cca: student.cca
      });
    }
    window.alert('The athletes data has been added succesfully');
  }


}
