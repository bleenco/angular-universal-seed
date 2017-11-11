import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { AppComponent }     from './app.component';
import { AppHomeComponent } from './components/app-home';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' })
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
