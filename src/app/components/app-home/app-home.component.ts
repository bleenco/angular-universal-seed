import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-home',
  templateUrl: 'app-home.component.html'
})
export class AppHomeComponent {
  value: string;
}
