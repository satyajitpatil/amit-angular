import { CartService } from './../shopping/cart/cart.service';
import { FoodItem } from './FoodItem';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private subject = new Subject<FoodItem[]>();
  isAdmin = false;
  addedToCart = false;
  cartAddedId: number;
  foodItemsList: FoodItem[];
  isLoggedIn = false;
  clickedOnAdd = false;

  constructor(private cartService: CartService, private router: Router) {
    this.foodItemsList = [
      {
        id: 1,
        name: 'Sandwich',
        category: 'Main Course',
        price: 99,
        active: true,
        freeDelivery: true,
        dateOfLaunch: new Date(),
        imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80'
      },
      {
        id: 2,
        name: 'Burger',
        category: 'Starters',
        price: 99,
        active: true,
        freeDelivery: false,
        dateOfLaunch: new Date(),
        imageUrl: 'https://images.unsplash.com/photo-1550949987-33f716ccc232?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=708&q=80'
      },
      {
        id: 3,
        name: 'French Fries',
        category: 'Main Course',
        price: 99,
        active: true,
        freeDelivery: false,
        dateOfLaunch: new Date(),
        imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
      },
      {
        id: 4,
        name: 'Pizza',
        category: 'Main Course',
        price: 99,
        active: true,
        freeDelivery: false,
        dateOfLaunch: new Date(),

        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
      },
      {
        id: 5,
        name: 'Chocolate Brownie',
        category: 'Main Course',
        price: 99,
        active: true,
        freeDelivery: false,
        dateOfLaunch: new Date(2017, 7, 14),
        imageUrl: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=730&q=80'
      },
    ];
  }

  getSubject(): Subject<FoodItem[]> {
    return this.subject;
  }

  getFoodItems() {
    return this.foodItemsList;
  }

  getFoodItemsCustomer() {
    return this.foodItemsList.filter((foodItem) => foodItem.active && foodItem.dateOfLaunch <= new Date());
  }

  addToCart(foodItemId: number) {
    if (this.isLoggedIn) {
      for (const foodItem of this.foodItemsList) {
        if (foodItem.id == foodItemId) {
          this.cartService.getCart().cartItems.push(foodItem);
          this.cartService.calcPrice();
          this.addedToCart = true;
          this.cartAddedId = foodItemId;
        }
      }
    } else {
      this.clickedOnAdd = true;
      this.router.navigate(['login']);
    }
  }

  removeFromCart(foodItemId: number) {
    for (let i = 0; i < this.cartService.getCart().cartItems.length; i++) {
      if (this.cartService.getCart().cartItems[i].id === foodItemId) {
        this.cartService.getCart().cartItems.splice(i, 1);
        this.cartService.calcPrice();
        break;
      }
    }
  }



  updateFoodItem(foodItem: FoodItem) {
    let count = 0;
    for (const fItem of this.foodItemsList) {

      if (fItem.id === foodItem.id) {
        this.foodItemsList[count] = foodItem;
        break;
      }
      count++;
    }
    console.log(this.foodItemsList);
  }

}
