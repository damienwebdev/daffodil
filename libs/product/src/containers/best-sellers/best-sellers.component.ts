import { Component, OnInit } from '@angular/core';
import { Observable ,  combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../../reducers/index';
import { DaffBestSellersLoad } from '../../actions/best-sellers.actions';
import { DaffProduct } from '../../models/product';

@Component({
  selector: '[best-sellers-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'BestSellersContainer'
})
export class DaffBestSellersContainer implements OnInit {

  loading$: Observable<boolean>;
  bestSellers: DaffProduct[];

  constructor(
    private store: Store<fromProduct.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new DaffBestSellersLoad());

    this.loading$ = this.store.pipe(select(fromProduct.selectBestSellersLoadingState));

    combineLatest(
      this.getProducts(), this.getBestSellersIds()
    ).subscribe(([products, bestSellersIds]) => {
      this.bestSellers = [];

      bestSellersIds.forEach(id => {
        products.forEach(product => {
          if (product.id === id) {
            this.bestSellers.push(product);
          }
        });
      });
    });
  }

  private getProducts(): Observable<DaffProduct[]> {
    return this.store.pipe(select(fromProduct.selectAllProducts));
  }

  private getBestSellersIds(): Observable<string[]> {
    return this.store.pipe(select(fromProduct.selectBestSellersIdsState));
  }
}
