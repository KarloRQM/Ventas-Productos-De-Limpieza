import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  
  
  
  constructor(){
    this.createForm();
    const oldata = localStorage.getItem('EmpData');
    if(oldata != null){
      const paserData = JSON.parse(oldata);
      this.employeeList = paserData;
    }
  }
  reset(){
    this.employeeObj = new EmployeeModel(); 
    this.createForm();
  }
  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empId,[Validators.required]),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pinCode: new FormControl(this.employeeObj.pinCode,[Validators.required,Validators.minLength(6)]),
      state: new FormControl(this.employeeObj.state) 
    })
  }

  onSave(){
    const oldata = localStorage.getItem('EmpData');
    if(oldata != null){
      const paserData = JSON.parse(oldata);
      this.employeeForm.controls['empid'].setValue(paserData.length + 1);
      this.employeeList.unshift( this.employeeForm.value);
    } else {
      this.employeeList.unshift( this.employeeForm.value);
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.reset();
  }

  onEdit(item:EmployeeModel){
    this.employeeObj = item;
    this.createForm();
  
  }

  onUpdate(){
    const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empid'].value);
    if(record != undefined){
      record.name = this.employeeForm.controls['name'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.address = this.employeeForm.controls['address'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.state = this.employeeForm.controls['state'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.reset();
   
  }
   onDelete(id:number){
    const isDelete = confirm('Are you sure you want to delete this record?');
    if(isDelete){
      const index = this.employeeList.findIndex(m => m.empId == id);
      this.employeeList.splice(index, 1);
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
  }
  
}


