import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpClientModule} from '@angular/common/http'
import {AppComponent} from './app.component'
import {FormsModule} from '@angular/forms';
import { HintComponent } from './components/hint/hint.component';
import { SelectComponent } from './components/select/select.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HintComponent,
    SelectComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
