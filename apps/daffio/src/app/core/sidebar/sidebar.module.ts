import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DaffSidebarModule, DaffButtonModule } from '@daffodil/design';

import { DaffioSidebarStateModule } from './sidebar.state.module';
import { DaffioSidebarViewportContainer } from './containers/sidebar-viewport/sidebar-viewport.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    
    DaffioSidebarStateModule,
    DaffSidebarModule,
    DaffButtonModule
  ],
  declarations: [
    DaffioSidebarViewportContainer
  ],
  exports: [
    DaffioSidebarViewportContainer
  ]
})
export class DaffioSidebarModule {}
