import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductGridViewComponent } from './product/pages/product-grid-view/product-grid-view.component';
import { CartViewComponent } from './cart/pages/cart-view/cart-view.component';
import { ProductViewComponent } from './product/pages/product-view/product-view.component';
import { CheckoutViewComponent } from './checkout/pages/checkout-view/checkout-view.component';
import { TemplateComponent } from './core/template/template/template.component';
import { NotFoundComponent } from './misc/not-found/not-found.component';
import { ThankYouViewComponent } from './thank-you/pages/thank-you-view.component';
import { EmptyCartResolver } from './cart/routing-resolvers/resolvers/empty-cart-resolver.service';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/product-grid',
    pathMatch: 'full'
  },
  {
    path: '', component: TemplateComponent, children: [
      { path: 'product-grid', component: ProductGridViewComponent},
      { path: 'cart', component: CartViewComponent },
      { path: 'product/:id', component: ProductViewComponent },
      { 
        path: 'checkout',
        children: [
          { path: '', component: CheckoutViewComponent },
          { path: 'thank-you', component: ThankYouViewComponent }
        ],
        resolve: {
          cartItem: EmptyCartResolver
        }
      },
      { path: '404', component: NotFoundComponent },
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
