import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  updateDepartment(val: { DepartmentId: string; DepartmentName: string; }) {
    throw new Error('Method not implemented.');
  }
readonly APIUrl="http://localhost:52411/api";
readonly PhotoUrl="http://localhost:52411/Photos/";

  constructor(private http:HttpClient) { }

  getDepList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Department');
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/Department',val);
  }

  putDepartment(val:any){
    return this.http.put(this.APIUrl+'/Department',val);
  }

  deleteDepartment(val:any){
    return this.http.delete(this.APIUrl+'/Department/'+val);
  }

  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee');
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/Employee',val);
  }

  putEmployee(val:any){
    return this.http.put(this.APIUrl+'/Employee',val);
  }

  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/Employee/'+val);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/Employee/SaveFile',val);
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Employee/GetAllDepartmentNames');
  }


}
