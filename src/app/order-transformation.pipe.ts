import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderTransformation'
})
export class OrderTransformationPipe implements PipeTransform {
  transform(orders: any[]): any[] {
    if (!orders || orders.length === 0) {
      return [];
    }

    // Initialize the transformed array
    const transformedOrders = [];

    // Iterate through each order
    for (const order of orders) {
      const newOrder = {
        Address: order.Address,
        CustomerName: order.CustomerName,
        Phone: order.Phone,
        PayMethod: order.PaymentMethod,
        Total: this.calculateTotal(order.OrderItems),
        OrderItems: order.OrderItems.map((item: { Quantity: any; Menu: { Name: any; }; }) => ({
          Quantity: item.Quantity,
          Name: item.Menu.Name
        }))
      };

      transformedOrders.push(newOrder);
    }

    return transformedOrders;
  }

  private calculateTotal(orderItems: any[]): number {
    let total = 0;
    for (const item of orderItems) {
      total += item.Quantity * item.Menu.Price;
    }
    return total;
  }
}
