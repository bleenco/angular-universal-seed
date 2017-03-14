import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '@angularclass/universal-transfer-state';

@Component({
  selector: 'app-home-view',
  template: `<h3>{{ data }}</h3>`
})
export class HomeViewComponent implements OnInit {
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
