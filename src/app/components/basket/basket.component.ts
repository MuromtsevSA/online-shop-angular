import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  constructor(private productsService: ProductsService){}

  basket: IProducts[];
  basketSubscription: Subscription;

  ngOnInit(): void {
    this.basketSubscription = this.productsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
      console.log(data);
    })
  }

  ngOnDestroy(){
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  minusItemFromBasket(item: IProducts){
    if (item.quantity === 1){
      this.productsService.removeProductFromBasket(item.id).subscribe((data) => {
        let idx = this.basket.findIndex((item) => data.id === item.id);
        this.basket.splice(idx, 1);
      })
    } else {
      item.quantity -= 1;
      this.productsService.updateProductToBasket(item).subscribe((data) => {

    });
    }

  }

  plusItemFromBasket(item: IProducts) {
    item.quantity += 1;
      this.productsService.updateProductToBasket(item).subscribe((data) => {

    });
  }
}
