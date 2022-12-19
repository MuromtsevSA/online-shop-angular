import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? null),
    year: new FormControl(this.data?.year ?? null),
    price: new FormControl(this.data?.price ?? null),
    chip: new FormControl(this.data?.chip ?? null),
    ssd: new FormControl(this.data?.ssd ?? null),
    dispaly: new FormControl(this.data?.display ?? null),
    memory: new FormControl(this.data?.memory ?? null)
  });

  isNew: boolean = true;

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.data = {
      id : this.myForm.value.id,
      title: this.myForm.value.title,
      year: this.myForm.value.year,
      price: this.myForm.value.price,
      image: "assets/Images/mac.jpg",
      configure: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }
    }
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
    if (this.data) {
      this.isNew = false;
    }
  }
}
