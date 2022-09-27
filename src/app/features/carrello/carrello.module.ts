import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenereComponent } from '../genere/genere.component';
import { CarrelloRoutingModule } from './carrello-routing.module';
import { CarrelloComponent } from './carrello.component';

@NgModule({
  declarations: [CarrelloComponent],
  imports: [CommonModule, CarrelloRoutingModule],
  providers: [],
})
export class CarrelloModule {}
