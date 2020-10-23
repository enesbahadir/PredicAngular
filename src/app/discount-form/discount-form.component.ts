import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debug } from 'console';
import { brotliCompress } from 'zlib';
import { DiscountComponent } from '../discount/discount.component';
import { Discount } from '../model/discount';
import { DiscountValues } from '../model/discountValues';
import { Preschool } from '../model/preschool';
import { PreschoolComponent } from '../preschools/preschool.component';
import { DiscountValuesService } from '../service/discount-values.service';
import { DiscountService } from '../service/discount.service';
import { PreschoolService } from '../service/preschool.service';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.css']
})
export class DiscountFormComponent implements OnInit {

discountForm: FormGroup;
discount: Discount = {discountName:"", discountType:"PERCENTAGE", userType: [], discountValues:[],
                      id:0, organizationName: ""  };
discountValues: DiscountValues[];
preschools: Preschool[];
userTypeList = [
  {
    name: "PERSONEL",
    disabled: false,
    checked: false,
    labelPosition: "after"
  }, {
    name: "IHVAN",
    disabled: false,
    checked: false,
    labelPosition: "after"
  }, {
    name: "STANDART",
    disabled: false,
    checked: false,
    labelPosition: "after"
  }
];
  constructor(private discountService : DiscountService, 
    private discountValuesService : DiscountValuesService, 
    private preschoolService: PreschoolService,
    private discountComponent: DiscountComponent) { }

  ngOnInit(): void {
    this.preschoolService.getPreschools().
    subscribe(preschools => this.preschools = preschools);

    this.discountForm = new FormGroup({
      discountNameInput : new FormControl(this.discount.discountName, [
        Validators.required
      ]),
      discountTypeSelect : new FormControl(this.discount.discountType, [
        Validators.required
      ]),
      userTypeCheckBox : new FormControl(this.discount.userType),
      organizationNameSelect : new FormControl(this.discount.organizationName),
      discountValues : new FormControl( this.discount.discountValues)
    });
  }

  newDiscount(): void {
    this.discount.userType = this.getUserTypesFromForm();
    this.discount.discountValues = this.getDiscountValuesFromForm();
    this.discountService.addDiscount(this.discount).subscribe((res: HttpResponse<Discount>)=>{  
      if(res){
          this.discountComponent.ngOnInit();
          }
     });
  }

  newDiscountValues(): void {
  }

  getUserTypesFromForm()
  {
    let discountUserTypes: any[] = [];
    this.userTypeList.filter(check => check.checked == true).forEach(function(value){
      discountUserTypes.push(value.name);
    });
    return discountUserTypes;
  }

  getDiscountValuesFromForm() {
    let discountValues: DiscountValues[] = [];
    for (let i= 0; i < this.preschools.length; i++) {
       if(document.getElementsByName('discountValuesCheckBox'+i)[0].checked)
       { 
        let discountValue : DiscountValues = {id: 0, preschool: this.preschools[i], 
          value: Number(<HTMLInputElement>document.getElementById('discountValuesText'+i).value) };

        this.discountValuesService.addDiscountValues(discountValue)
        .subscribe((res: HttpResponse<DiscountValues>)=>{  
          if(res){
              discountValues.push(res.body);
                }
           });
       }
    }
    return discountValues; 
    
  }


}
