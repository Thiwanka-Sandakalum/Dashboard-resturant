import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';

interface OrderItem {
  Quantity: number;
  Menu: {
    Price: number;
    Name: string;
  };
}

interface OriginalOrder {
  id: number;
  Address: string;
  CustomerName: string;
  Phone: string;
  PaymentMethod: string;
  OrderItems: OrderItem[];
}

interface NewOrder {
  address: string;
  Name: string;
  phone: string;
  payMethod: string;
  total: number;
  OrderItems: OrderItem[];
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  title = 'dashboard-restaurant';
  totalOrders!: number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Define the type for MatTableDataSource
  orderItemsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Define the type for order item table
  displayedColumns: string[] = ['address', 'Name', 'phone', 'payMethod', 'total', 'orderItems'];
  orderItemsColumns: string[] = ['name', 'price', 'quantity'];
  selectedOrder: any = null; // To store the selected order for showing order items
  showOrderItemsTable = false;

  constructor(private api: ApiServiceService) { }

  ngOnInit() {
    this.getOrders();
  }

  showOrderItems(order: any) {
    this.selectedOrder = order;
    const convertedObjects: any[] | undefined = [];
  
    order.OrderItems.forEach((element: any) => {
      console.log(element);
      convertedObjects.push({
        name: element.Menu.Name,
        price: element.Menu.Price,
        quantity: element.Quantity
      });
    });
  
    this.orderItemsDataSource = new MatTableDataSource<any>(convertedObjects);
  
    console.log(convertedObjects);
  
    this.showOrderItemsTable = true;
  }
  

  hideOrderItems() {
    this.selectedOrder = null;
    this.orderItemsDataSource = new MatTableDataSource<any>([]);
    this.showOrderItemsTable = false;
  }

  getOrders() {
    this.api.getOrders().subscribe(
      (data) => {
        this.totalOrders = data.length;
        this.originalOrders = data;
        console.log(data);

        // Transform the originalOrders array into a new array with the desired structure
        this.newOrders = this.originalOrders.map((originalOrder) => {
          // Calculate the total price for this order
          const total = originalOrder.OrderItems.reduce((acc, item) => {
            return acc + item.Quantity * item.Menu.Price;
          }, 0);

          // Map the originalOrder object to the NewOrder structure
          const newOrder: NewOrder = {
            address: originalOrder.Address,
            Name: originalOrder.CustomerName,
            phone: originalOrder.Phone,
            payMethod: originalOrder.PaymentMethod,
            total,
            OrderItems: originalOrder.OrderItems,
          };

          return newOrder;
        });

        // Assign the newOrders array to the dataSource
        this.dataSource = new MatTableDataSource<any>(this.newOrders);
      },
      (error) => console.log(error)
    );
  }

  originalOrders: OriginalOrder[] = [];
  newOrders: NewOrder[] = [];
}
