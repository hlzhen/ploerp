import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'plo-pagination',
  templateUrl: './plo-pagination.component.html',
  styleUrls: ['./plo-pagination.component.less']
})
export class PloPaginationComponent implements OnInit {
  pageSizeOption: any[] = [
    { label: '10 条 / 页', value: 10 },
    { label: '20 条 / 页', value: 20 },
    { label: '30 条 / 页', value: 30 },
    { label: '40 条 / 页', value: 40 },
    { label: '50 条 / 页', value: 50 },
  ];
  @Input() pageSize = 10;               // 默认页大小
  @Input() total: any = 100;            // 总记录数
  @Input() totalPage: any = 10;         // 总页数
  @Input() pageSizeOptions?: number[];  // 指定每页显示条数
  currentPage: any = 1;                 // 当前页
  private lastCurrentPage = 1;          // 上一次页数


  @Output() paginationCallback: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.pageSizeOptionsManage();
    this.lastCurrentPage = this.currentPage;
  }

  pageSizeOptionsManage() {
    if (this.pageSizeOptions && this.pageSizeOptions.length > 0) {
      let pageOptions = [];
      this.pageSizeOptions.forEach(item => {
        pageOptions.push({ "label": "" + item + " 条 / 页", "value": item });
      });
      this.pageSizeOption = pageOptions;
    }
  }

  ploSelectedChange(e: any) {
    this.ploPaginationCallback();
  }

  ploPageIndexChange(e: any) {
    if (!(/(^[1-9]\d*$)/).test(this.currentPage)) {
      this.currentPage = this.lastCurrentPage;
    }
    switch (e.which) {
      case 0:
        if (this.currentPage > 1) {
          this.currentPage--;
        }
        break;
      case 1:
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
        }
        break;
      case 13:
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
        }
        break;
    }
    this.lastCurrentPage = this.currentPage;
    this.ploPaginationCallback();
  }

  ploPaginationCallback() {
    this.paginationCallback.emit({ "currentPage": Number.parseInt(this.currentPage), "pageSize": this.pageSize });
  }

}
