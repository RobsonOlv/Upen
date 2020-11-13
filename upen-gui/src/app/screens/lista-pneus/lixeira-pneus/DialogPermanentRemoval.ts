import { Component, Inject } from '@angular/core';
import {Pneu} from '../../../../../../common/pneu'
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'dialog-permanentremoval',
  templateUrl: 'dialog-permanentremoval.html',
  styleUrls: ['./lixeira-pneus.component.css']
})
export class DialogPermanentRemoval {


  constructor( @Inject (MAT_DIALOG_DATA) public pneu: Pneu, 
  private dialogRef: MatDialogRef<DialogPermanentRemoval>,
  ){}

  onClick(): void{
    this.dialogRef.close(this.pneu.id);
  }
}