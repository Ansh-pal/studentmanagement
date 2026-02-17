import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  editingId: number | null = null;
  loading = false;
  error: string = '';

  constructor(private studentService: StudentService) { }

  async ngOnInit(): Promise<void> {
    await this.loadStudents();
  }

  async loadStudents(): Promise<void> {
    this.loading = true;
    this.error = '';
    try {
      this.students = await this.studentService.getAllStudents().toPromise();
    } catch (err) {
      this.error = 'Failed to load students';
      console.log('Error loading students:', err);
    } finally {
      this.loading = false;
    }
  }

  async deleteStudent(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await this.studentService.deleteStudent(id).toPromise();
        await this.loadStudents();
      } catch (err) {
        this.error = 'Failed to delete student';
        console.log('Error deleting student:', err);
      }
    }
  }

  setEditingId(id: number | null): void {
    this.editingId = id;
  }
}
