import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(
    private Apiservice: ApiServiceService,
    private fb: FormBuilder
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d{1,5}(\.\d{1,2})?$/)]]
    });
  }

  totalOrders!: number;
  menuList: any[] = [];
  newMenu: any = {};
  dataSource!: MatTableDataSource<any>;
  menuForm: FormGroup;

  displayedColumns: string[] = ['name', 'price', 'description', 'edit', 'delete'];

  ngOnInit(): void {
    this.menuData();
    this.menuList.forEach(item => {
      item.isEditing = false;
    });
  }

  toggleEdit(index: number): void {
    const item = this.menuList[index];
    item.isEditing = !item.isEditing;

    // If saving changes (checkmark clicked), call editMenu method
    if (!item.isEditing) {
      this.editMenu(item);
    }
  }

  total(data: any): void {
    this.totalOrders = data;
    console.log(data);
  }

  menuData(): void {
    this.Apiservice.getMenus().subscribe(
      (menus) => {
        this.menuList = menus;
        this.dataSource = new MatTableDataSource<any>(this.menuList);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addMenu(): void {
    if (this.menuForm?.valid) { // Use optional chaining
      // Create an object to hold the menu data you want to send
      const newMenuData = {
        name: this.menuForm.get('name')?.value ?? '',
        description: this.menuForm.get('description')?.value ?? '',
        price: this.menuForm.get('price')?.value ?? ''
      };

      // Push the new menu data to the menuList array
      this.menuList.push(newMenuData);

      // Send the request to create the menu
      this.Apiservice.createMenu(newMenuData).subscribe(
        () => {
          // Request successful, reset the form
          this.menuForm?.reset(); // Use optional chaining
          this.menuData()

        },
        (error) => {
          console.error('Error creating menu:', error);
        }
      );
    }
  }

  editMenu(menu: any): void {
    // Implement the edit functionality here
    // console.log('Edit menu:', menu.id, menu.price);
    this.Apiservice.editMenu(menu.id, menu.price).subscribe(
      () => {
        this.menuData()
      },
      (error) => {
        console.error('Error updating menu:', error);
      }
    );
  }

  deleteMenu(menu: any): void {
    console.log('Delete menu:', menu.id);
    this.Apiservice.deleteMenu(menu.id).subscribe(
      () => this.menuData(),
      (error) => console.log(error)
    )
  }


}
