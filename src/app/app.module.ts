import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    BookModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
