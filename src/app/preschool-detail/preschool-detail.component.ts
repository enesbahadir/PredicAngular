import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Preschool } from '../preschool';
import { PreschoolService } from '../preschool.service';

@Component({
  selector: 'app-preschool-detail',
  templateUrl: './preschool-detail.component.html',
  styleUrls: ['./preschool-detail.component.css']
})
export class PreschoolDetailComponent implements OnInit {

  preschool: Preschool;

  constructor(
    private route: ActivatedRoute,
    private preschoolService: PreschoolService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getPreschool();
  }
  getPreschool(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.preschoolService.getPreschool(id)
      .subscribe(preschool => this.preschool = preschool);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.preschoolService.updatePreschool(this.preschool)
      .subscribe(() => this.goBack());
  }

}
