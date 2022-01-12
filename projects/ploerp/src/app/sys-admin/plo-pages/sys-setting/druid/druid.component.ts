import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-druid',
  templateUrl: './druid.component.html',
  styleUrls: ['./druid.component.less']
})
export class DruidComponent implements OnInit {
  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    // this.urlSafe = this.sanitizer.bypassSecurityTrustHtml('http://localhost:8809/druid/login.html');
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8809/druid/login.html');
  }

}
