import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plo-mask',
  templateUrl: './plo-mask.component.html',
  styleUrls: ['./plo-mask.component.less']
})
export class PloMaskComponent implements OnInit {
  isOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  public openMask() {
    this.isOpen = true;
  }

  public coloseMask() {
    this.isOpen = false;
  }

}
