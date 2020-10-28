import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

loading = false;
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
    this.discountService.addDiscount(this.discount).subscribe((res: HttpResponse<Discount>)=>{  
      if(res){
        this.discount.id = res.body.id;
        this.getDiscountValuesFromForm(this.discount.id);
          }
    });
   
      
  }

  updateDiscountValues(discountValues: DiscountValues[]): void {
    debugger;
    this.discount.discountValues = discountValues;
     this.discountService.updateDiscount(this.discount).subscribe((res: HttpResponse<Discount>)=>{  
      if(res){
          this.discountComponent.ngOnInit();
          }
    }); 
  }

  getUserTypesFromForm()
  {
    let discountUserTypes: any[] = [];
    this.userTypeList.filter(check => check.checked == true).forEach(function(value){
      discountUserTypes.push(value.name);
    });
    return discountUserTypes;
  }

  getDiscountValuesFromForm(discountId: number) {
    let discountValues: DiscountValues[] = [];
    for (let i= 0; i < this.preschools.length; i++) {
      let checked = (<HTMLInputElement><unknown>document.getElementsByName('discountValuesCheckBox'+i)[0]).checked;
       if(checked)
       { 
        let value = (<HTMLInputElement><unknown>document.getElementById('discountValuesText' + i)).value;
        let discountValue : DiscountValues = {
          id: 0, preschool: this.preschools[i], 
          value: Number(value) 
        };
        this.loading = true;
        this.discountValuesService.addDiscountValues(discountValue, discountId)
        .subscribe((res: HttpResponse<DiscountValues>)=>{  
          this.loading = false;
          if(res){
              discountValues.push(res.body);
              this.updateDiscountValues(discountValues);
                }
           });
       }
    }
    return discountValues; 
    
  }
  
}
