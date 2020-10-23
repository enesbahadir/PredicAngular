import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discount } from '../model/discount';
import { Location } from '@angular/common';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-discount-detail',
  templateUrl: './discount-detail.component.html',
  styleUrls: ['./discount-detail.component.css']
})
export class DiscountDetailComponent implements OnInit {

  discount: Discount;

  constructor(
    private route: ActivatedRoute,
    private discountService: DiscountService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getDiscount();
  }
  getDiscount(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.discountService.getDiscount(id)
      .subscribe(discount => this.discount = discount);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.discountService.updateDiscount(this.discount)
      .subscribe(() => this.goBack());
  }

}
