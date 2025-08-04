import { DatePipe } from '@angular/common';
import { OrdersService } from './../../core/services/orders/orders.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit{

  private readonly allordersService = inject(OrdersService)

  orders : any[] = [];

  ngOnInit(): void {
    this.allordersService.getUserOrders().subscribe({
      next:(res)=>{
        this.orders = res;
        console.log(this.orders);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
