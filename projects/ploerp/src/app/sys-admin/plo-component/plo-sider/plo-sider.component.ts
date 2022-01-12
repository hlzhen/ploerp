import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpResp } from '../../plo-service/http-resp';
import { PloUtilsService } from '../../plo-service/plo-utils.service';

@Component({
  selector: 'plo-sider',
  templateUrl: './plo-sider.component.html',
  styleUrls: ['./plo-sider.component.less']
})
export class PloSiderComponent implements OnInit {
  @Input() inlineCollapsed: boolean = false;
  public subscription: Subscription;
  private routerPath: string;
  private themeColor = '#7a7af1';
  menus: any[] = [];

  constructor(private http: HttpClient, private router: Router, private utils: PloUtilsService) {
    this.routerPath = this.router.url.slice(1);
  }

  ngAfterViewInit() {
    // 获取菜单更改后的通知信息
    this.subscription = this.utils.getMessage().subscribe(async msg => {
      await this.drawInit(msg.routerPath);
      this.utils.redirectTo(msg.routerPath)
    });
  }

  async ngOnInit(): Promise<void> {
    await this.drawInit(this.routerPath);
  }

  async drawInit(routerPath) {
    console.log('sider init: ' + routerPath)
    const result = await this.http.post<HttpResp>("http://127.0.0.1:8809/sys/sider", "").toPromise();
    this.menus = result.data.menus;
    const links = this.getAllRouter(this.menus);
    this.utils.setRunTimeCache("ROUTER-ALL", JSON.stringify(links));
    let menuItem = this.matchRouter(links, routerPath);
    if (menuItem) {
      this.initMenu(this.menus, menuItem.fid);
    }
  }


  /**
   * 子菜单按钮点击
   * @param item item
   */
  childrenNodeClick(fid: number) {
    if (fid === 0) {
      this.parentNodeManage(this.menus, fid)
    } else {
      this.menus = this.childrenNodeManage(this.menus, fid);
    }
  }


  /**
   * 子节点处理
   * @param menus 
   * @param fid 
   */
  childrenNodeManage(menus: any[], fid: number) {
    let tempMenus: any[] = [];
    const menuFun = (menus: any[], fid: number) => {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].id == fid) {
          tempMenus.push(menus[i].id)
          menuFun(this.menus, menus[i].fid);
          break;
        } else {
          if (menus[i].children.length > 0) {
            menuFun(menus[i].children, fid)
          }
        }
      }
    }
    menuFun(menus, fid);
    const setMenuColor = (menus: any[]) => {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].children.length > 0) {
          this.utils.isInStrItem(menus[i].id, ...tempMenus) ? menus[i].color = this.themeColor : menus[i].color = '';
          setMenuColor(menus[i].children)
        }
      }
    }
    setMenuColor(menus)
    return menus;
  }

  /**
   * 父菜单处理
   * @param menus 
   * @param fid 
   */
  parentNodeManage(menus: any[], fid: number) {
    // 给每个一级菜单颜色置空
    menus.forEach(item => {
      if (item.children && item.children.length > 0) {
        item.color = '';
        item.open = false;
        this.parentNodeManage(item.children, fid);
      }
    });
  }


  /**
   * 初始化菜单
   * @param menus 菜单数据
   * @param fid 菜单id
   */
  initMenu(menus: any[], fid: number) {
    const menuFun = (menus: any[], fid: number) => {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].id == fid) {
          menus[i].open = true;
          menus[i].color = this.themeColor;
          menuFun(this.menus, menus[i].fid);
          break;
        } else {
          if (menus[i].children.length > 0) {
            menuFun(menus[i].children, fid);
          }
        }
      }
    }
    menuFun(menus, fid);
    return menus;
  }

  /**
   * 获取所有路由
   * @param menus 菜单数据
   */
  getAllRouter(menus: any[]) {
    const links: any[] = [];
    const linkFun = (data: any[]) => {
      data.forEach(item => {
        item.children.length > 0 ? linkFun(item.children) : links.push({ id: item.id, fid: item.fid, link: item.link });
      });
    }
    linkFun(menus);
    return links;
  }

  /**
   * 路由匹配
   * @param link 
   */
  matchRouter(links: any[], link: string) {
    for (let i = 0; i < links.length; i++) {
      if (link.indexOf(links[i].link) != -1) return links[i];
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
