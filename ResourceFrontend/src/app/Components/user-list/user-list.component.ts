import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filter } from '../../Utils/Filter';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  searchText : any = '';
  userList : any;
  recordCount : any;
  modalObject : any;
  modalTitle : any;
  showModal : any = false;
  sortFlag : any = -1;
  
  nameSort = -1;
  emailSort = -1;
  designationSort = -1;
  mobileSort = -1;

  userForm : FormGroup;
  initFilter = new Filter();
  constructor(private userService : UserService, private formBuilder : FormBuilder, private spinner : NgxSpinnerService, private toaster : ToastrService) {
   }
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name : [''],
      email: [''],
      mobileNo : [''],
      designation : ['']
    })
    this.getAllUsers(this.initFilter);
  }

  getAllUsers(filter){
    this.spinner.show();
    this.emptyFormData();
    this.userService.getUserList(filter.FiltertoString()).subscribe((res)=>{
      if(res){
        this.userList = res;
        this.recordCount = this.userList.length;
        this.spinner.hide();
      }
      else{
        this.toaster.error('There was some error fetching user. Please try again.');
        this.spinner.hide();
      }
    })
  }

  emptyFormData(){
    this.userForm.get('id').setValue('');
        this.userForm.get('name').setValue('');
        this.userForm.get('email').setValue('');
        this.userForm.get('mobileNo').setValue('');
        this.userForm.get('designation').setValue('');
  }

  addUser(){
    this.spinner.show();
    this.userService.addUser(this.userForm.value).subscribe((res)=>{
      if(res['status'] == 'Success'){
        this.toaster.success('User added sucessfully!');
        this.initFilter.skipRecord = 0;
        this.spinner.hide();
        this.getAllUsers(this.initFilter);
        this.showModal = false;
      }
      else{
        this.toaster.error('There was some error adding user. Please try again.');
        this.spinner.hide();
        this.showModal = false;
      }
    })
  }

  deleteUser(userId : any){
    this.userService.deleteUser(userId).subscribe((res)=>{
      if(res['status'] == 'Success'){
        this.initFilter.skipRecord = 0;
        this.toaster.success('User deleted sucessfully!');
        this.getAllUsers(this.initFilter);
      }
      else{
        this.toaster.error('There was some error deleting user. Please try again.');
        this.spinner.hide();
      }
    });
  }

  editUser(){
    this.spinner.show();
    this.userService.updateUser(this.userForm.value).subscribe((res)=>{
      if(res['status'] == 'Success'){
        this.initFilter.skipRecord = 0;
        this.spinner.hide();
        this.toaster.success('User updated sucessfully!');
        this.getAllUsers(this.initFilter);
        this.showModal = false;
      }
      else{
        this.toaster.error('There was some error updating user. Please try again.');
        this.spinner.hide();
        this.showModal = false;
      }
    })
  }

  openModal(operation : any, data : any){
      if(operation === 'add'){
        this.modalTitle = 'Add';
        this.showModal = true;
      }
      else{
        this.modalTitle = 'Edit';
        this.userForm.get('id').setValue(data._id);
        this.userForm.get('name').setValue(data.name);
        this.userForm.get('email').setValue(data.email);
        this.userForm.get('mobileNo').setValue(data.mobileNo);
        this.userForm.get('designation').setValue(data.designation);

        this.showModal = true;
      }
  }

  closeModal(){
    this.emptyFormData();
  }

  sort(columnName : any){
    if(columnName == 'name'){ this.initFilter.sortOrder = this.nameSort; this.nameSort = this.nameSort == -1 ? 1 : -1; }
    else if(columnName == 'mobileNo'){ this.initFilter.sortOrder = this.mobileSort; this.mobileSort = this.mobileSort == -1 ? 1 : -1; }
    else if(columnName == 'email'){ this.initFilter.sortOrder = this.emailSort; this.emailSort = this.emailSort == -1 ? 1 : -1; }
    else{ this.initFilter.sortOrder = this.designationSort; this.designationSort = this.designationSort == -1 ? 1 : -1; }
    this.initFilter.sortCoulumn = columnName;
    this.initFilter.searchText = this.searchText;
    this.initFilter.skipRecord = 0;
    this.getAllUsers(this.initFilter);
  }

  search(){
    this.initFilter.searchText = this.searchText;
    this.initFilter.skipRecord = 0;
    this.getAllUsers(this.initFilter);
  }

  onScroll() {
    this.spinner.show();
    this.initFilter.skipRecord = this.userList.length;  
    this.userService.getUserList(this.initFilter.FiltertoString()).subscribe(
      data => {
        this.userList = this.userList.concat(data);
        this.spinner.hide();
      }
    )
  }

}
