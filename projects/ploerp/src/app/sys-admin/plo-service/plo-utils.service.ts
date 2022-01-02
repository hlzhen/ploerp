import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PloUtilsService {

  private subject = new Subject<any>();

  constructor(private router: Router) {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
  }

  /**
   * 检测Str 是否存在后面参数列表
   * @param findStr 
   * @param array 
   */
  public isInStrItem = (findStr: any, ...array: any): boolean => {
    findStr = [findStr].join('');
    for (let i = 0; i < array.length; i++) {
      if ([array[i]].join('') == findStr) {
        return true;
      }
    }
    return false;
  };


  /**
   * 四舍五入保留 n 位小数 不补零
   * @param num
   * @param n
   */
  public roundFun = (num: any, n: number): any => {
    return Math.round(Number(num) * Math.pow(10, n)) / Math.pow(10, n);
  }


  /**
   * URL校验
   * @param url
   */
  public checkURL = (url: string): boolean => {
    const strRegexp = '^((https|http|ftp)://)?(([\\w_!~*\'()\\.&=+$%-]+: )?[\\w_!~*\'()\\.&=+$%-]+@)?(([0-9]{1,3}\\.){3}[0-9]{1,3}|(localhost)|([\\w_!~*\'()-]+\\.)*\\w+\\.[a-zA-Z]{1,6})(:[0-9]{1,5})?((/?)|(/[\\w_!~*\'()\\.;?:@&=+$,%#-]+)+/?)$'
    return new RegExp(strRegexp, 'i').test(encodeURI(url));
  }



  /**
   * 路由跳转
   * @param routerLink
   */
  public redirect = (routerLink: string) => {
    this.router.navigateByUrl(routerLink);
  }


  /**
   * 字符串转数组
   * @param str
   */
  public toArray = (str: string): any[] => {
    return Array.prototype.slice.call(str);
  }


  /**
   * 深拷贝
   * @param obj
   */
  public deepCopy = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * 获取当前时间
   */
  public getSysDate = (): Date => {
    return new Date();
  }

  public getSubject = (): Subject<any> => {
    return this.subject;
  }



  /**
   * 运行时缓存，用完即时清理
   */
  public localStorage: any;
  public setRunTimeCache = (key: any, val: any) => {
    this.localStorage[key] = val;
  }
  public getRunTimeCache = (key: any) => {
    return this.localStorage[key];
  }
  public removeRunTimeCache = (key: any) => {
    this.localStorage.removeItem(key);
  }


  public isRegex = (regex, v) => {
    console.log(v)
    const reg = new RegExp(regex);
    return !reg.test(v);
  }




}
