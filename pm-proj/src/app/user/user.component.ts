import { Component } from '@angular/core';
import { DataServiceService, userSchema } from '../data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user:userSchema = {fullname: "",
    email: "",
    phone_number: "",
    }

  constructor(
    public dialog: MatDialog,
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

  openEditDialog() {
    this.dialog.open(EditUserComponent).afterClosed().subscribe(this.handleEditedInfo());
  }

  handleEditedInfo() {
    return (received:any) => {
      this.ngOnInit()
    }
  }



}


