import { Injectable } from '@angular/core';

import * as fromActions from './../actions/cart.action';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { OccCartService } from '../../../newocc/cart/cart.service';
import { ProductImageConverterService } from '../../../product/converters';

@Injectable()
export class CartEffects {
  @Effect()
  loadCart$: Observable<any> = this.actions$.ofType(fromActions.LOAD_CART).pipe(
    map((action: fromActions.LoadCart) => action.payload),
    mergeMap(payload => {
      return this.cartService.loadCart(payload.userId, payload.cartId).pipe(
        map((cart: any) => {
          if (cart.entries) {
            for (const entry of cart.entries) {
              this.productImageConverter.convertProduct(entry.product);
            }
          }
          return new fromActions.LoadCartSuccess(cart);
        }),
        catchError(error => of(new fromActions.LoadCartFail(error)))
      );
    })
  );

  @Effect()
  createCart$: Observable<any> = this.actions$
    .ofType(fromActions.CREATE_CART)
    .pipe(
      map((action: fromActions.CreateCart) => action.payload),
      mergeMap(payload => {
        return this.cartService
          .createCart(
            payload.userId,
            payload.oldCartId,
            payload.toMergeCartGuid
          )
          .pipe(
            map((cart: any) => {
              if (cart.entries) {
                for (const entry of cart.entries) {
                  this.productImageConverter.convertProduct(entry.product);
                }
              }
              return new fromActions.CreateCartSuccess(cart);
            }),
            catchError(error => of(new fromActions.CreateCartFail(error)))
          );
      })
    );

  @Effect()
  mergeCart$: Observable<any> = this.actions$
    .ofType(fromActions.MERGE_CART)
    .pipe(
      map((action: fromActions.MergeCart) => action.payload),
      mergeMap(payload => {
        return this.cartService.loadCart(payload.userId, 'current').pipe(
          map(currentCart => {
            return new fromActions.CreateCart({
              userId: payload.userId,
              oldCartId: payload.cartId,
              toMergeCartGuid: currentCart.guid
            });
          })
        );
      })
    );

  constructor(
    private actions$: Actions,
    private productImageConverter: ProductImageConverterService,
    private cartService: OccCartService
  ) {}
}
