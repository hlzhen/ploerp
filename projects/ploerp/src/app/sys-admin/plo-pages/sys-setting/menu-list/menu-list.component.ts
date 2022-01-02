import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

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

  constructor(private http: HttpClient, private modal: NzModalService,) {
    this.setPageHeader('菜单列表');
  }

  async ngOnInit(): Promise<void> {
    this.drawInit(this.menuName, this.state);
  }



  async drawInit(nemnuName?: string, state?: any) {
    this.loading = true;
    const result = await this.http.post("http://127.0.0.1:8809/sys/menus", {
      name: nemnuName, state: state
    }).toPromise();
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
      if (data.children && data.children.length !== 0) {
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
      if (node.children) {
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
      const item = this.mapOfExpandedData[data.id];
      item.forEach(d => {
        if (d.children && d.children.length !== 0) {
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
      nzStyle: {"width":'300px',"height":"20px"},
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }

  async doDel(e: any) {
    let hasChildren = e.children && e.children.length > 0;
    let content = hasChildren ? '请先删除子节点' : '确定要删除该节点吗？';
    this.confirmModal = await this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
         new Promise((resolve, reject) => resolve)
    });
    console.log(this.confirmModal)
    console.log(1)
    // let ref = this.modal.confirm({
    //   nzTitle: '删除',
    //   nzContent: content,
    //   nzOkText: '确认',
    //   nzOkType: 'danger',
    //   nzOnOk: () => console.log('OK'),
    //   nzCancelText: '取消',
    //   nzOnCancel: () => console.log('Cancel')
    // });
    // console.log(ref)
  }
}
