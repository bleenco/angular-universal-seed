import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '@angularclass/universal-transfer-state';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-home-view',
  template: `
    <h3>{{ data }}</h3>
    <input type="text" [(ngModel)]="value" placeholder="Write here...">
    <p>{{ value }}</p>
  `
})
export class HomeViewComponent implements OnInit {
  value: string;
  data: { greeting: string, name: string };

  constructor(private http: TransferHttp) {}

  ngOnInit() {
    this.http.get('http://localhost:8000/data')
    .first()
    .map(data => {
      return `${ data.greeting } ${ data.name }`;
    })
    .subscribe(data => this.data = data, err => {
      this.data = err;
    });
  }
}
