import { Component, OnInit } from '@angular/core';

import { Preschool } from '../model/preschool';
import { PreschoolService } from '../service/preschool.service';

@Component({
  selector: 'app-preschool',
  templateUrl: './preschool.component.html',
  styleUrls: ['./preschool.component.css']
})
export class PreschoolComponent implements OnInit {
  preschools: Preschool[];

  constructor(private preschoolService: PreschoolService) { }

  ngOnInit(): void {
    this.getPreschools();
  }

  getPreschools(): void {
    this.preschoolService.getPreschools()
    .subscribe(preschools => this.preschools = preschools);
  }

  delete(preschool: Preschool): void {
    this.preschools = this.preschools.filter(h => h !== preschool);
    this.preschoolService.deletePreschool(preschool).subscribe();
  }

}
