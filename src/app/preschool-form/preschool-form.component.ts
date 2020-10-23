import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Preschool } from '../model/preschool';
import { PreschoolDetailComponent } from '../preschool-detail/preschool-detail.component';
import { PreschoolService } from '../service/preschool.service';
import { PRESCHOOLS } from '../model/preschoolList';
import { PreschoolComponent } from '../preschools/preschool.component';

@Component({
  selector: 'app-preschool-form',
  templateUrl: './preschool-form.component.html',
  styleUrls: ['./preschool-form.component.css']
})
export class PreschoolFormComponent implements OnInit {

  preschoolForm: FormGroup;
  preschool: Preschool = {preschoolName: "", price: 0, 
    endOfEarlyRegistrationDate: "", id:PRESCHOOLS.length+1};
 
  constructor(private preschoolService: PreschoolService, private preschoolComponent: PreschoolComponent) { }

  ngOnInit(): void {
    this.preschoolForm = new FormGroup({
      name : new FormControl(this.preschool.preschoolName, [
        Validators.required,
        Validators.minLength(4)
      ]),
      price : new FormControl(this.preschool.price),
      endOfEarlyRegistrationDate : new FormControl(this.preschool.endOfEarlyRegistrationDate)
    });
  }

  get name() { return this.preschoolForm.get('name').value; }

  get price() { return this.preschoolForm.get('price').value; }

  get endOfEarlyRegistrationDate() { return this.preschoolForm.get('endOfEarlyRegistrationDate').value; }

  submitted = false;

  onSubmit() {  }

  newPreschool() {
     this.preschoolService.addPreschool(this.preschool).subscribe((res: HttpResponse<Preschool>)=>{  
      if(res){
          this.preschoolComponent.ngOnInit();
          }
     });
  }

  

}
