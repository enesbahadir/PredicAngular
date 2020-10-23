import { DiscountValues } from './discountValues';

export interface Discount {
    id : number;
    discountName : string;
    discountType : string;
    userType : string [];
    organizationName: string;
    discountValues: DiscountValues[];
}