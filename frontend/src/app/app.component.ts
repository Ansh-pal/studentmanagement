import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StudentListComponent, StudentFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Student Management System';
  editingId: number | null = null;

  onStudentSaved(): void {
    this.editingId = null;
  }
}
