import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUserList(filter : any){
    return this.http.get(environment.baseUrl+'/resource/getAll'+filter);
  }

  addUser(data : any){
    return this.http.post(environment.baseUrl+'/resource/add',data);
  }

  deleteUser(id : any){
    let data ={"id":id};
    return this.http.post(environment.baseUrl+'/resource/delete',data);
  }

  updateUser(data : any){
    return this.http.post(environment.baseUrl+'/resource/update',data);
  }
}
