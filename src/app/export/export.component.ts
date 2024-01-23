import { Component, OnInit } from '@angular/core';
import { Athlete } from '../athlete.model';
import { AthleteService } from '../athlete.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent implements OnInit{
  Athlete: Athlete[];

  constructor(private athleteService: AthleteService){}

  ngOnInit(){
    this.athleteService.getAthleteList().subscribe(res=>{
      this.Athlete =res.map( e=>{
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as unknown as Athlete;
      })
    })
  }



}

