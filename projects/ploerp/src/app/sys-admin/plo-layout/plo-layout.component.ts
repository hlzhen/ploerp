import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plo-layout',
  templateUrl: './plo-layout.component.html',
  styleUrls: ['./plo-layout.component.less']
})
export class PloLayoutComponent implements OnInit {

  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void { }


  doCollapsed(e: boolean) {
    this.isCollapsed = e;
  }

}
