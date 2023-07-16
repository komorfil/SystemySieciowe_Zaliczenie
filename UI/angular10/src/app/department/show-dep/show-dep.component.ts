import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  DepartmentList: any[] = [];
  ModalTitle: string = '';
  ActivateAddEditDepComp: boolean = false;
  dep: any;

  constructor(private service: SharedService) {}

  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any[] = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(): void {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ''
    };
    this.ModalTitle = 'Add Department';
    this.ActivateAddEditDepComp = true;
  }

  editClick(item: any): void {
    this.dep = item;
    this.ModalTitle = 'Edit Department';
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item: any): void {
    if (confirm('Are you sure?')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      });
    }
  }

  closeClick(): void {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  refreshDepList(): void {
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
    });
  }

  FilterFn() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el: any) {
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().toLowerCase()
      ) &&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      );
    });
  }

  performSort(prop: string, asc: boolean) { // Zmieniona nazwa na performSort
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
  }
}
