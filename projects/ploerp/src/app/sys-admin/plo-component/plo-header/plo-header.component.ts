import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import * as screenfull from 'screenfull';
import { PloUtilsService } from '../../plo-service/plo-utils.service';

@Component({
  selector: 'plo-header',
  templateUrl: './plo-header.component.html',
  styleUrls: ['./plo-header.component.less']
})
export class PloHeaderComponent implements OnInit {
  isFullscreen: boolean = false;
  isLock: boolean = false;

  isCollapsed: boolean = false;
  @Output() collapsed: EventEmitter<boolean> = new EventEmitter<boolean>();


  @ViewChild('lock') lock: any;

  constructor(private utils: PloUtilsService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.utils.getRunTimeCache('PLO-LOCK')) {
      this.doLock(false);
    }
  }



  private get sf(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  /**
   * 菜单缩进
   * @param e 
   */
  doCollapsed(e) {
    this.isCollapsed = !e;
    this.collapsed.emit(this.isCollapsed);
  }


  /**
   * 监听屏幕大小变化
   */
  @HostListener('window:resize')
  _resize(): void {
    this.isFullscreen = this.sf.isFullscreen;
  }

  /**
   * 全屏
   */
  doFullscreen() {
    if (this.sf.enabled) {
      this.sf.toggle();
    }
  }

  doLock(e) {
    this.isLock = !e;
    if (this.isLock) {
      if(!this.utils.getRunTimeCache('PLO-LOCK')){
        this.utils.setRunTimeCache('PLO-LOCK', this.isLock);
      }
      this.lock.openLock();
      return;
    }
    this.lock.closeLock();
  }

  unlockCallback(e) {
    this.isLock = e;
  }
}
