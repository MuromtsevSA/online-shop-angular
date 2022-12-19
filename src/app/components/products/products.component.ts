import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private ProductsService: ProductsService, public dialog: MatDialog ){}

  products: IProducts[];
  productsSubscription: Subscription;
  basket: IProducts[];
  basketSubscription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;

  ngOnInit(): void {
    this.canEdit = true;
    this.productsSubscription =  this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    })
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;
    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
      if (findItem) {
         this.updateToBasket(findItem);
      } else {
        this.postToBasket(product);
      }
    } else this.postToBasket(product);

  }

  postToBasket(product: IProducts){
    this.ProductsService.postProductToBasket(product).subscribe((data) => {
      this.basket.push(data);
    });
  }

  updateToBasket(product: IProducts){
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => {

    });
  }

  openDialog(product?: IProducts): void {
    const dialogRef = this.dialog.open(DialogBoxComponent,{
      width: "600px",
      data: product,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id) {
          this.updateData(data);
        } else {
          this.postData(data)
        }
      }
    });
  }

  deleteItem(id: number) {
    this.ProductsService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      if (id === item.id) {
        let idx = this.products.findIndex((data) => data.id === id);
        this.products.splice(idx, 1);
      }
    }));
  }

  updateData(product: IProducts) {
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((item) => {
        if (item.id === data.id) {
          return data;
        } else {
          return item;
        }
      })
    });
  }

  postData(data: IProducts) {
    this.ProductsService.postProduct(data).subscribe((data) => this.products.push(data));
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();

  }
}
