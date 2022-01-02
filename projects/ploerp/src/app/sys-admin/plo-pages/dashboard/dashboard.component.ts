import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  subTitel?: string = '';
  backTitle?: string = '';
  showBack?: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.setPageHeader('数据统计');
  }


  setPageHeader(subTitel: string, backTitle?: string, showBack?: boolean) {
    this.subTitel = subTitel;
    this.backTitle = backTitle;
    this.showBack = showBack;
  }

  goBack(e: boolean) {
    if (e) {
      console.log(e);
    }
  }


  paginationCallback(e: any) {
    console.log(e)
  }

  
}
