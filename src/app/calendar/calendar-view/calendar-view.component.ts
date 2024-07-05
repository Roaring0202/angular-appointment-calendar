import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentService } from '../appointment.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

import { CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-calendar-view',
  standalone: true,
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  providers: [AppointmentService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    AppointmentFormComponent,
    CdkDropList, CdkDrag, MatTableModule, MatIconModule
  ]
})
export class CalendarViewComponent implements OnInit {
  @ViewChild('table', { static: true }) table: MatTable<any> = [] as any;

  isEdit = false;
  editObject: any;
  displayedColumns: string[] = ['position', 'title', 'date', 'action'];

  appointments$: Observable<any>;
  dataSource: MatTableDataSource<any>;

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.appointments$;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.appointments$.subscribe(data => {
      this.dataSource.data = data;
    });
  }


  addAppointment(appointment: { id?: number, title: string, date: Date }) {
    if (this.isEdit) {
      console.log(appointment);
      this.appointmentService.updateAppointment({ id: this.editObject.id, ...appointment });
      this.isEdit = false;
      this.editObject = {};

    } else {
      this.appointmentService.addAppointment(appointment.title, appointment.date);
    }
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id);
  }

  editAppointment(appointment: { id: number, title: string, date: Date }) {
    this.isEdit = true;
    this.editObject = appointment;
  }

  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.dataSource.data.findIndex(d => d === event.item.data);

    moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
