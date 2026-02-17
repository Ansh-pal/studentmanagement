import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
  @Input() editingId: number | null = null;
  @Output() studentSaved: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  isEditing: boolean = false;
  loading = false;
  error: string = '';

  constructor(private studentService: StudentService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      rollNo: new FormControl('', Validators.required),
      course: new FormControl(''),
      marks: new FormControl(0, Validators.min(0))
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.editingId !== null) {
      this.isEditing = true;
      try {
        const student = await this.studentService.getStudentById(this.editingId).toPromise();
        this.form.patchValue({
          name: student.name,
          rollNo: student.rollNo,
          course: student.course,
          marks: student.marks
        });
      } catch (err) {
        this.error = 'Failed to load student data';
        console.log('Error loading student:', err);
      }
    } else {
      this.isEditing = false;
      this.form.reset({
        name: '',
        rollNo: '',
        course: '',
        marks: 0
      });
    }
  }

  async onSubmit(): Promise<void> {
    this.error = '';
    if (this.form.invalid) {
      this.error = 'Please fill all required fields correctly.';
      return;
    }
    this.loading = true;
    try {
      if (this.isEditing && this.editingId !== null) {
        await this.studentService.updateStudent(this.editingId, this.form.value).toPromise();
      } else {
        await this.studentService.addStudent(this.form.value).toPromise();
      }
      this.form.reset({
        name: '',
        rollNo: '',
        course: '',
        marks: 0
      });
      this.studentSaved.emit();
    } catch (err) {
      this.error = 'Failed to save student';
      console.log('Error saving student:', err);
    } finally {
      this.loading = false;
    }
  }

  // ...existing code...
    }
    return true;
  }

  resetForm(): void {
    this.student = {
      id: 0,
      name: '',
      rollNo: '',
      course: '',
      marks: 0
    };
    this.submitted = false;
  }
}
