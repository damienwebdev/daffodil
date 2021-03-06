import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { 
  OrderActionTypes,
  PlaceOrderSuccess,
  PlaceOrder,
  PlaceOrderFailure
} from '../actions/order.actions';
import { DaffCheckoutDriver } from '../../drivers/injection-tokens/driver-checkout.token';
import { DaffCheckoutServiceInterface } from '../../drivers/interfaces/checkout-service.interface';
import { DaffCartServiceInterface, DaffCartDriver } from '@daffodil/cart';

@Injectable()
export class OrderEffects {

  constructor(
    private actions$: Actions,
    @Inject(DaffCheckoutDriver) private checkoutDriver: DaffCheckoutServiceInterface,
    @Inject(DaffCartDriver) private cartDriver: DaffCartServiceInterface
  ) {}

  @Effect()
  onPlaceOrder$ : Observable<any> = this.actions$.pipe(
    ofType(OrderActionTypes.PlaceOrderAction),
    switchMap((action: PlaceOrder) => 
      this.checkoutDriver.placeOrder(action.payload.id.toString())
        .pipe(
          map((resp) => {
            return new PlaceOrderSuccess(resp);
          }),
          catchError(error => {
            return of(new PlaceOrderFailure('Failed to place order'));
          })
        )
    )
  )

  // Only here temporarily, until we figure out how to simulate a cart clear on placeOrder in the in memory service
  @Effect({ dispatch: false })
  onPlaceOrderSuccess$ : Observable<any> = this.actions$.pipe(
    ofType(OrderActionTypes.PlaceOrderSuccessAction),
    tap(() => { 
      return this.cartDriver.clear().subscribe();
    })
  )
}
