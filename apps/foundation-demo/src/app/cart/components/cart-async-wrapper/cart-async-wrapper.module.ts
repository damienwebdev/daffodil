import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartAsyncWrapperComponent } from './cart-async-wrapper.component';
import { PromotionModule } from '../promotion/promotion.module';
import { CartSummaryModule } from '../cart-summary/cart-summary.module';
import { ProceedToCheckoutModule } from '../proceed-to-checkout/proceed-to-checkout.module';
import { ContinueShoppingModule } from '../continue-shopping/continue-shopping.module';
import { MiscModule } from '../../../misc/misc.module';
import { CartComponentModule } from '../cart/cart-component.module';

@NgModule({
  imports: [
    CommonModule,
    CartComponentModule,
    PromotionModule,
    CartSummaryModule,
    ProceedToCheckoutModule,
    ContinueShoppingModule,
    MiscModule
  ],
  declarations: [
    CartAsyncWrapperComponent
  ],
  exports: [
    CartAsyncWrapperComponent
  ]
})
export class CartAsyncWrapperModule { }