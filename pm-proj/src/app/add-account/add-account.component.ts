import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataServiceService, accountDetailsSchema } from '../data-service.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
  balance = 0
  accountType = ""
  currency = ""
  validAccount: boolean = false;

  constructor(private dialogRef: MatDialogRef<AddAccountComponent>,
              private dataService:DataServiceService) {}

  validateAccount() {
    if (this.currency != "" && this.balance >= 0 && this.accountType != "") {
      this.validAccount = true
    } else {
      this.validAccount = false
    }
  }

  onAddClick() {
    if (this.validAccount) {
      let accountDetailsSchema: accountDetailsSchema = {
        accountType: this.accountType,
        balance: this.balance,
        currency: this.currency,
        userId: 1}
      
      this.dataService.postAccount(accountDetailsSchema).subscribe(this.handleCreatedAccount())
    }
  }


  handleCreatedAccount() {
    return (received: any) => {
      this.dialogRef.close("sucess")
    }
  }

  onCancelClick() {
    this.dialogRef.close()
  }
}
