import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  showSuccessMessage(message: string){
    // @ts-ignore
    this._snackBar.open(message, '',{panelClass:'success-message',duration:1000});
  }
  showErrorMessage(message: string){
    // @ts-ignore
    this._snackBar.open(message, '',{panelClass:'error-message',duration:1000});
  }
}
