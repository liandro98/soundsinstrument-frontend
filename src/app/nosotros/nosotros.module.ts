import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NosotrosRoutingModule } from './nosotros-routing.module';
import { NosotrosPageComponent } from './nosotros-page/nosotros-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NosotrosPageComponent
  ],
  imports: [
    CommonModule,
    NosotrosRoutingModule,
    SharedModule
    
  ]
})
export class NosotrosModule { }
