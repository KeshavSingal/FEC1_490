import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemUpdateComponent } from './item-update/item-update.component';
import { ItemDeleteComponent } from './item-delete/item-delete.component';
import { ItemService } from './item.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemCreateComponent,
    ItemListComponent,
    ItemUpdateComponent,
    ItemDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
