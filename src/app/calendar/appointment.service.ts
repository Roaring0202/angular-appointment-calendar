import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Appointment {
    id: number;
    title: string;
    date: Date;
}

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
    appointments$ = this.appointmentsSubject.asObservable();
    private nextId = 1;

    addAppointment(title: string, date: Date) {
        const appointments = this.appointmentsSubject.getValue();
        appointments.push({ id: this.nextId++, title, date });
        this.appointmentsSubject.next(appointments);
    }

    deleteAppointment(id: number) {
        const appointments = this.appointmentsSubject.getValue();
        this.appointmentsSubject.next(appointments.filter(app => app.id !== id));
    }

    updateAppointment(payload: { id: number, title: string, date: Date }) {
        const appointments = this.appointmentsSubject.getValue();
        const appointment = appointments.find(app => app.id === payload.id);
        if (appointment) {
            appointment.date = payload.date;
            appointment.title = payload.title;
            this.appointmentsSubject.next(appointments);
        }
    }
}
