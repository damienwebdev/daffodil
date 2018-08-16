import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store, select } from '@ngrx/store';

import { Product } from '@daffodil/core';
import * as fromProduct from '../../reducers/index';
import { ProductLoad, UpdateQty } from '../../actions/product.actions';
import { AddToCart } from '../../../cart/actions/cart.actions';

@Component({
  selector: '[product-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'ProductContainer'
})
export class ProductContainer implements OnInit {

  @Input() selectedProductId: string;

  loading$: Observable<boolean>;
  product$: Observable<Product>;
  qty$: Observable<number>;

  constructor(
    private store: Store<fromProduct.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new ProductLoad(this.selectedProductId));

    this.loading$ = this.store.pipe(
      select(fromProduct.selectSelectedProductLoadingState)
    );

    this.product$ = this.store.pipe(
      select(fromProduct.selectSelectedProduct)
    );

    this.qty$ = this.store.pipe(
      select(fromProduct.selectSelectedProductQty)
    )
  }

  updateQty(payload: number) {
    this.store.dispatch(new UpdateQty(payload));
  }

  addToCart(payload) {
    this.store.dispatch(new AddToCart(payload));
  }
}