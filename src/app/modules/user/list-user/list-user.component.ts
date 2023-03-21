import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../../shared/services/user.service";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  createdDate: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName','email','mobile', 'createdDate', 'action'];
  dataSource = new MatTableDataSource<User>();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  approve(id: number){}

  view(id: number){

   // this.router.navigate(['academic/'+userId])
  }

  loadUsers(){
    this.userService.getUsers().subscribe(res=>{
      const users = res.map((user:any)=>{
          return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            mobile: user.mobile,
            createdDate: user.created_at,
          }
      })
      this.dataSource =users;
    })
  }
}
