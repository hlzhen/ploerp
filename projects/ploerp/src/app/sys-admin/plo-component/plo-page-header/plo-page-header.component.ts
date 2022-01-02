import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'plo-page-header',
  templateUrl: './plo-page-header.component.html',
  styleUrls: ['./plo-page-header.component.less']
})
export class PloPageHeaderComponent implements OnInit {

  @Input() subTitle?: string;           // 主页标题
  @Input() backTitle?: string;          // 返回标题
  @Input() showBack?: boolean = false;  // 是否显示返回按钮

  @Output() onBack: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  goBack(e) {
    this.onBack.emit(e);
  }

}
