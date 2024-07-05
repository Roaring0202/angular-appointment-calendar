import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AppointmentFormComponent implements OnChanges {
  @Input() isEdit = false;
  @Input() editObject: any;
  @Output() submitForm = new EventEmitter<{ title: string, date: Date }>();

  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editObject) {
      this.populateForm(this.editObject);
    }
  }

  populateForm(editData: any) {
    this.appointmentForm.patchValue({
      title: editData.title,
      date: editData.date
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      this.submitForm.emit(formData);
      this.appointmentForm.reset();
    }
  }
}
