import { ProductViewModel } from "../products/product.model";

export class OrderViewModel {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: OrderProductViewModel[];
  PaymentType: string;
}
export class OrderProductViewModel {
  ProductId: number
  Quantity: number
}
