import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleBarComponent } from './toolbars/title-bar/title-bar.component';
import { MenuBarComponent } from './toolbars/menu-bar/menu-bar.component';
import { BookCardComponent } from './books/book-card/book-card.component';
import { BookModalComponent } from './books/book-modal/book-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    MenuBarComponent,
    BookCardComponent,
    BookModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
