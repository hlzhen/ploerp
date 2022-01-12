import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PloUtilsService } from '../../plo-service/plo-utils.service';

@Component({
  selector: 'app-plo-page-notfound',
  templateUrl: './plo-page-notfound.component.html',
  styleUrls: ['./plo-page-notfound.component.less']
})
export class PloPageNotfoundComponent implements OnInit {
  hasChildren: boolean = false;
  
  constructor(private utils: PloUtilsService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.hasChildren = this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.hasChildren;
    console.log(this.hasChildren)
  }

  goHome() {
    this.router.navigate(['dashboard'])
  }

}
