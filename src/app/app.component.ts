import { Component, OnInit } from '@angular/core';
import { TransferState } from '@angularclass/universal-transfer-state';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private cache: TransferState) {}

  ngOnInit() {
    this.cache.set('cached', true);
  }
}
