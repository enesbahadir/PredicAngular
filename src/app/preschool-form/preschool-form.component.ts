import { Component, OnInit } from '@angular/core';
import { Preschool } from '../preschool';

@Component({
  selector: 'app-preschool-form',
  templateUrl: './preschool-form.component.html',
  styleUrls: ['./preschool-form.component.css']
})
export class PreschoolFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submitted = false;

  onSubmit() { this.submitted = true; }

  model: Preschool;

}
