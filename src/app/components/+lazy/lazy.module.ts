import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-lazy-view',
  template: `<h3>i'm lazy</h3>`
})
export class AppLazyViewComponent {}

@NgModule({
  declarations: [ AppLazyViewComponent ],
  imports: [
    RouterModule.forChild([
      { path: '', component: AppLazyViewComponent, pathMatch: 'full' }
    ])
  ]
})
export class LazyModule { }
