import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() dep:any;
  DepartmentId: string | undefined;
  DepartmentName:string | undefined;
  CityName:string | undefined;
  PostalCode:string | undefined;

  ngOnInit(): void {
    this.DepartmentId=this.dep.DepartmentId;
    this.DepartmentName=this.dep.DepartmentName;
    this.CityName=this.dep.CityName;
    this.PostalCode=this.dep.PostalCode;
  }

  addDepartment(){
    var val = { DepartmentId:this.DepartmentId, DepartmentName:this.DepartmentName,
                CityName:this.CityName, PostalCode:this.PostalCode};
    this.service.addDepartment(val).subscribe(res=>{
      alert(res.toString());
    })
  }

  updateDepartment(){
    var val = { DepartmentId:this.DepartmentId, DepartmentName:this.DepartmentName,
                CityName:this.CityName, PostalCode:this.PostalCode};
    this.service.updateDepartment(val).subscribe(res=>{
      alert(res.toString());
    })
  }

}
