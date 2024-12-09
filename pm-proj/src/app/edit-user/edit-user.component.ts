import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataServiceService, userSchema } from '../data-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user:userSchema = {
    fullname: "",
    email: "",
    phone_number: "",
    accounts: []
  }

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    private dataService: DataServiceService) {} 

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.dataService.getAllUser()
    .subscribe(this.handleUsers())
  }

  handleUsers() {
    return (received:any) => {
      this.user = received
    }
  }

  onCancelClick() {
    this.dialogRef.close()
  }

  onSaveClick() {
    this.dataService.putUser(this.user)
    .subscribe(this.handleEditedUser())
  }

  handleEditedUser() {
    return (received: any) => {
      this.dialogRef.close("sucess")
    }
  }

}


