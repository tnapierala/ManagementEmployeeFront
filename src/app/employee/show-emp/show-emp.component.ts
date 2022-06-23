import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private servise:SharedService) { }

  EmployeeList:any=[];

  ModalTitle:string | undefined;
  emp:any;
  ActivateAddEditEmpComp:boolean=false;

  EmployeeIdFilter:string="";
  EmployeeNameFilter:string="";
  DepartmentFilter:string="";
  DateJoinFilter:string="";
  PaymentDolarFilter:string="";
  EmployeeListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateJoin:"",
      PaymentDolar:0,
      PhotoFileName:"anonymus.png"
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
  };

  editClick(item: any) {
    this.emp=item;
    this.ModalTitle="Edit Employee"
    this.ActivateAddEditEmpComp = true;
    this.refreshEmpList();
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')) {
      this.servise.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.servise.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
      this.EmployeeListWithoutFilter=data;
    })
  }

  FilterFn(){
    var EmployeeIdFilter = this.EmployeeIdFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;
    var DepartmentFilter = this.DepartmentFilter;
    var DateJoinFilter = this.DateJoinFilter;
    var PaymentDolarFilter = this.PaymentDolarFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(
      function (el: { EmployeeId: { toString: () => string; };
                      EmployeeName: { toString: () => string; };
                      Department: { toString: () => string; };
                      DateJoin: { toString: () => string; };
                      PaymentDolar: { toString: () => string; }; }){

      return el.EmployeeId.toString().toLowerCase().includes(
        EmployeeIdFilter.toString().trim().toLowerCase()
      )&&
      el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase()
      )&&
      el.Department.toString().toLowerCase().includes(
        DepartmentFilter.toString().trim().toLowerCase()
      )&&
      el.DateJoin.toString().toLowerCase().includes(
        DateJoinFilter.toString().trim().toLowerCase()
      )&&
      el.PaymentDolar.toString().toLowerCase().includes(
        PaymentDolarFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop: string | number, asc: any){
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }
}
