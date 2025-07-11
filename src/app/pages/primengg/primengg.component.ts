import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
// Adjust the path as needed

interface City {
  name: string;
  code: string;
}

interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-primengg',
  templateUrl: './primengg.component.html',
  styleUrls: ['./primengg.component.scss']
})
export class PrimenggComponent implements OnInit {
  cities: City[] = [];
  products: Product[] = [
    { code: 'P001', name: 'Apple iPhone', category: 'Electronics', quantity: 10 },
    { code: 'P002', name: 'Nike Shoes', category: 'Footwear', quantity: 25 },
    { code: 'P003', name: 'Samsung TV', category: 'Electronics', quantity: 5 },
    { code: 'P004', name: 'Levi\'s Jeans', category: 'Clothing', quantity: 15 },
    { code: 'P005', name: 'MacBook Pro', category: 'Electronics', quantity: 8 },
    { code: 'P006', name: 'Adidas Sneakers', category: 'Footwear', quantity: 20 },
    { code: 'P007', name: 'Sony Headphones', category: 'Electronics', quantity: 12 },
    { code: 'P008', name: 'Canon Camera', category: 'Electronics', quantity: 7 },
    { code: 'P009', name: 'Puma T-shirt', category: 'Clothing', quantity: 30 },
    { code: 'P010', name: 'Dell Laptop', category: 'Electronics', quantity: 9 },
    { code: 'P011', name: 'Apple Watch', category: 'Electronics', quantity: 14 },
    { code: 'P012', name: 'Reebok Shorts', category: 'Clothing', quantity: 18 },
    { code: 'P013', name: 'Samsung Tablet', category: 'Electronics', quantity: 6 },
    { code: 'P014', name: 'LG Monitor', category: 'Electronics', quantity: 11 },
    { code: 'P015', name: 'Under Armour Cap', category: 'Clothing', quantity: 22 },
    { code: 'P016', name: 'HP Printer', category: 'Electronics', quantity: 4 },
    { code: 'P017', name: 'Asus Router', category: 'Electronics', quantity: 13 },
    { code: 'P018', name: 'Ray-Ban Sunglasses', category: 'Accessories', quantity: 16 },
    { code: 'P019', name: 'Fossil Wallet', category: 'Accessories', quantity: 19 },
    { code: 'P020', name: 'Bose Speaker', category: 'Electronics', quantity: 8 },
    { code: 'P021', name: 'Timberland Boots', category: 'Footwear', quantity: 10 },
    { code: 'P022', name: 'Casio Watch', category: 'Accessories', quantity: 17 },
    { code: 'P023', name: 'JBL Earbuds', category: 'Electronics', quantity: 21 },
    { code: 'P024', name: 'North Face Jacket', category: 'Clothing', quantity: 7 },
    { code: 'P025', name: 'Fitbit Tracker', category: 'Electronics', quantity: 15 },
    { code: 'P026', name: 'Guess Belt', category: 'Accessories', quantity: 13 },
    { code: 'P027', name: 'Samsung Galaxy', category: 'Electronics', quantity: 12 },
    { code: 'P028', name: 'Nike Socks', category: 'Clothing', quantity: 28 },
    { code: 'P029', name: 'Apple AirPods', category: 'Electronics', quantity: 9 },
    { code: 'P030', name: 'Sony PlayStation', category: 'Electronics', quantity: 5 },
    { code: 'P031', name: 'Logitech Mouse', category: 'Electronics', quantity: 20 },
    { code: 'P032', name: 'H&M Shirt', category: 'Clothing', quantity: 24 },
    { code: 'P033', name: 'Canon Lens', category: 'Electronics', quantity: 6 },
    { code: 'P034', name: 'Levi\'s Jacket', category: 'Clothing', quantity: 11 },
    { code: 'P035', name: 'Apple Mac Mini', category: 'Electronics', quantity: 7 },
    { code: 'P036', name: 'Samsung Soundbar', category: 'Electronics', quantity: 8 },
    { code: 'P037', name: 'Adidas Cap', category: 'Clothing', quantity: 19 },
    { code: 'P038', name: 'Fossil Bag', category: 'Accessories', quantity: 14 },
    { code: 'P039', name: 'HP Monitor', category: 'Electronics', quantity: 10 },
    { code: 'P040', name: 'Puma Shoes', category: 'Footwear', quantity: 16 },
    { code: 'P041', name: 'Sony Camera', category: 'Electronics', quantity: 6 },
    { code: 'P042', name: 'Reebok Hoodie', category: 'Clothing', quantity: 13 },
    { code: 'P043', name: 'Apple iPad', category: 'Electronics', quantity: 8 },
    { code: 'P044', name: 'Timberland Sandals', category: 'Footwear', quantity: 12 },
    { code: 'P045', name: 'Casio Calculator', category: 'Electronics', quantity: 18 },
    { code: 'P046', name: 'JBL Speaker', category: 'Electronics', quantity: 9 },
    { code: 'P047', name: 'North Face Backpack', category: 'Accessories', quantity: 15 },
    { code: 'P048', name: 'Fitbit Scale', category: 'Electronics', quantity: 7 },
    { code: 'P049', name: 'Guess Sunglasses', category: 'Accessories', quantity: 11 },
    { code: 'P050', name: 'Nike Backpack', category: 'Accessories', quantity: 20 }
  ];
  
  // Pagination properties
  first: number = 0;
  rows: number = 2; // Only 2 items per page
  
  text: string | undefined;
  checked: boolean = true
  selectedCity: City | undefined;
  date : Date | undefined;

  items: MenuItem[] = [];
 
  constructor(private router: Router, ) {}

  // Pagination event handler
  onPageChangeee(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 2;
  }

  ngOnInit(): void {
          

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Features',
        icon: 'pi pi-star'
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt'
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server'
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil'
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette'
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette'
              }
            ]
          }
        ]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope'
      }
    ];
  }

  // Handle dropdown change
  onCityChange(event: any) {
    console.log('Selected city:', event.value);
    if (event.value && event.value.code === 'NY') {
      this.router.navigate(['/pending']); // Example route
    }
  }
}
