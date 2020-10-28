import { Component, OnInit } from '@angular/core';
import { Discount } from '../model/discount';
import { DiscountService } from '../service/discount.service';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  discounts: Discount[];
  displayedColumns: string[];
  
  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.getDiscounts();
    
    this.displayedColumns = ['id', 'discountName', 'discountType', 'userType', 'organizationName',
    'discountValues', 'editButton', 'deleteButton'];
  }
  getDiscounts() {
    this.discountService.getDiscounts().subscribe(
      discounts => this.discounts = discounts
    );
    
  }

  delete(discount: Discount): void {
    this.discounts = this.discounts.filter(h => h !== discount);
    this.discountService.deleteDiscount(discount).subscribe();
  }

}
