import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PloUtilsService } from '../../plo-service/plo-utils.service';

@Component({
  selector: 'plo-sider',
  templateUrl: './plo-sider.component.html',
  styleUrls: ['./plo-sider.component.less']
})
export class PloSiderComponent implements OnInit {

  @Input() inlineCollapsed: boolean;


  private routerPath: string;

  private themeColor = '#7a7af1';

  constructor(private http: HttpClient, private router: Router, private ploUtils: PloUtilsService) {
    this.routerPath = this.router.url.slice(1);
  }

  menus: any[] = [];
  async ngOnInit(): Promise<void> {

   
    /**
     * TODO: 
     *    1、获取当前路由地址，通过路由地址匹配当前菜单树，匹配后继续匹配当前路由是否有父节点，有父节点则展开
     *    2、当前菜单选中，一级菜单不管，多级菜单
     */
    console.log(this.routerPath);
    await this.drawInit();
  }

  async drawInit() {
    const result = await this.http.post("http://127.0.0.1:8809/sys/sider", "").toPromise();
    this.menus = result['data'].menus;
    console.log(this.menus)
    this.findByFidRS(this.menus, this.findByLink(this.findAllLinksRS(this.menus), this.routerPath).fid);
  }


  /**
   * 子菜单按钮点击
   * @param item item
   */
   itemMenuClick(item: any) {
    this.nodeManage(item.fid);
  }

  /**
   * 节点处理
   * @param menus 
   */
  nodeManage(fid: number) {
    fid == 0 ? this.zeroManage(this.menus, fid) : this.menus = this.fidManage(this.menus, fid);
  }

  /**
   * fid 处理
   * @param menus 
   * @param fid 
   */
  fidManage(menus: any[], fid: number) {
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
          this.ploUtils.isInStrItem(menus[i].id, ...tempMenus) ? menus[i].color = this.themeColor : menus[i].color = '';
          setMenuColor(menus[i].children)
        }
      }
    }
    setMenuColor(menus)
    return menus;
  }

  /**
   * 当 fid 为一级菜单时的处理
   * @param menus 
   * @param fid 
   */
  zeroManage(menus: any[], fid: number) {
    // 给每个一级菜单颜色置空
    menus.forEach(item => {
      if (item.children.length > 0) {
        item.color = '';
        this.zeroManage(item.children, fid);
      }
    });
  }


  /**
   * 根据菜单id查找
   * @param menus 菜单数据
   * @param fid 菜单id
   */
  findByFidRS(menus: any[], fid: number) {
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
   * 获取菜单所有链接
   * @param menus 菜单数据
   */
  findAllLinksRS(menus: any[]) {
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
   * 根据链接查找
   * @param link 
   */
  findByLink(links: any[], link: string) {
    for (let i = 0; i < links.length; i++) {
      if (link.indexOf(links[i].link) != -1) {
        return links[i];
      }
    }
  }

}
