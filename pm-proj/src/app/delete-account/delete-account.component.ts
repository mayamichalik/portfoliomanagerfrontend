import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataServiceService, accountDetailsSchema } from '../data-service.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  accounts: accountDetailsSchema[] = []
  selectedAccount = null
  validAccount = false

  constructor(private dialogRef: MatDialogRef<DeleteAccountComponent>,
              private dataService:DataServiceService) {}

  ngOnInit() {
    this.loadAccounts()
  }

  loadAccounts() {
    this.dataService.getAllAccounts()
    .subscribe(this.handleAllAccounts())
  }

  handleAllAccounts() {
    return (received: any) => {
      this.accounts = received
    }
  }

  validateAccount() {
    this.validAccount = this.selectedAccount != null
  }

  onDeleteClick() {
    if (this.validAccount && this.selectedAccount != null) {
      let account: accountDetailsSchema = this.selectedAccount
      
      this.dataService.deleteAccount(account.id!).subscribe(this.handleDeleteAccount())
    }
  }


  handleDeleteAccount() {
    return (received: any) => {
      this.dialogRef.close("sucess")
    }
  }

  onCancelClick() {
    this.dialogRef.close()
  }
}
