import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PloUtilsService } from '../../plo-service/plo-utils.service';

@Component({
  selector: 'plo-lock',
  templateUrl: './plo-lock.component.html',
  styleUrls: ['./plo-lock.component.less']
})


export class PloLockComponent implements OnInit {

  /**
   * TODO:需传入用户头像，名称
   */

  validateForm!: FormGroup;

  isMask: boolean = false;                  // 蒙层是否打开
  isLock: boolean = false;                  // 锁弹窗是否打开
  passwordVisible: boolean = false;         // 密码是否可见
  @Output('unlockCallback') unlockCallback = new EventEmitter<any>(); // 解锁回调

  private basicPassword: string = '123456'; // 默认密码
  private CLOSE_MASK_TIMEOUT: any = null;   // 定时器

  constructor(private fb: FormBuilder, private message: NzMessageService, private utils: PloUtilsService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      lockPwd: [null, [Validators.required]]
    });
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    let lockPwd = this.validateForm.get('lockPwd').value;
    if (lockPwd != this.basicPassword) {
      this.message.create('error', '密码错误！');
      return;
    }
    this.isLock = false;
    this.closeLock();
    return;
  }


  openLock() {
    this.isMask = true;
    this.isLock = true;
  }

  closeLock() {
    if (this.CLOSE_MASK_TIMEOUT) {
      clearTimeout(this.CLOSE_MASK_TIMEOUT);
    }
    this.CLOSE_MASK_TIMEOUT = setTimeout(() => {
      // 关闭蒙层
      this.isMask = false;
      this.unlockCallback.emit(this.isLock);
      this.utils.removeRunTimeCache('PLO-LOCK');
      this.validateForm.reset()
    }, 300);
  }
}
