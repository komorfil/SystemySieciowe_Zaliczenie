import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeeList: any[] = [];
  ModalTitle: string = '';
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(): void {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.png'
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item: any): void {
    console.log(item);
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item:any): void {
    if(confirm('Are you sure?')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  closeClick(): void {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList(): void {
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
    });
  }

}