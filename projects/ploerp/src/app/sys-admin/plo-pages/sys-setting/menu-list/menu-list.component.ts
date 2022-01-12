import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpResp } from '../../../plo-service/http-resp';
import { PloUtilsService } from '../../../plo-service/plo-utils.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.less']
})

export class MenuListComponent implements OnInit {

  confirmModal?: NzModalRef; // For testing by now
  subTitel: string;

  mapOfExpandedData: { [key: number]: any[] } = {};
  listOfMapData: any[] = [];

  state = null;
  menuName = null;

  expansion: boolean = false;
  loading: boolean = false;

  routerPath: string;

  constructor(private http: HttpClient, private modal: NzModalService, private utils: PloUtilsService, private router: Router,) {
    this.setPageHeader('菜单列表');
    this.routerPath = this.router.url.slice(1);
  }

  async ngOnInit(): Promise<void> {
    this.drawInit(this.menuName, this.state);
  }



  async drawInit(nemnuName?: string, state?: any) {
    this.loading = true;
    const result = await this.http.post<HttpResp>("http://127.0.0.1:8809/sys/menus", {
      name: nemnuName, state: state
    }).toPromise();
    // console.log(result)
    this.loading = false;
    this.listOfMapData = result['data'].list;
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    });
    if (this.expansion) {
      this.doExpanded(false)
    }
  }


  collapse(array: any[], data: any, $event: boolean): void {
    if (!$event) {
      if (data.children && data.children.length > 0) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }


  convertTreeToList(root: any): any[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, expand: false });
    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children && node.children.length > 0) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], expand: false, parent: node });
        }
      }
    }
    return array;
  }


  visitNode(node: any, hashMap: { [key: number]: boolean }, array: any[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }


  doExpanded(e: boolean) {
    this.expansion = !e;
    this.listOfMapData.forEach(data => {
      this.mapOfExpandedData[data.id].forEach(d => {
        if (d.children && d.children.length > 0) {
          d.expand = this.expansion;
        }
      })
    })
  }

  doRefresh() {
    this.state = null;
    this.menuName = null;
    this.doSearch();
  }


  doSearch() {
    this.drawInit(this.menuName, this.state);
  }

  setPageHeader(subTitel: string, backTitle?: string, showBack?: boolean) {
    this.subTitel = subTitel;
  }

  keyupEnter(e: any) {
    if (e.which === 13) {
      this.doSearch();
    }
  }


  doCreateMenu() {
    console.log('create');
    this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: 'string, will close after 1 sec',
      nzClosable: false,
      nzStyle: { "width": '300px', "height": "20px" },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }

  async doDel(e: any, d: any) {
    const hasChildren = e.children && e.children.length > 0;
    if (hasChildren) {
      this.modal.info({ nzTitle: '删除节点 ？', nzContent: '当前节点下还存在子节点，请先将子节点删除！' });
      return;
    }
    // 删除子节点
    this.modal.confirm({
      nzTitle: '确认删除当前节点吗 ？',
      nzContent: '确认删除【' + e.title + '】吗？删除后将无法执行对应数据操作！',
      nzOnOk: async () => {
        const result = await this.http.post<HttpResp>("http://127.0.0.1:8809/sys/del/menu", { mid: e.id }).toPromise();
        if (result.success) {
          setTimeout(() => {
            this.drawInit();
            // 通知siderbar刷新
            this.utils.sendMessage({ routerPath: this.routerPath });
          }, 200);
        }
      }
    });
  }
}
