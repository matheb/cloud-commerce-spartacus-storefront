import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './container/cart-details.component';
import { UrlTranslationModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { CmsModule } from '../../cms';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    RouterModule,
    UrlTranslationModule,
    CmsModule
  ],
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent]
})
export class CartDetailsModule {}
