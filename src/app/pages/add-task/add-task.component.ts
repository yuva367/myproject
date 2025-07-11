
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  // 🧾 Reactive Form Group
  taskForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9 ]+$/)
    ]],
    description: ['', [Validators.minLength(5)]],
    startDate: [''],
    endDate: [''],
    targetDate: ['', Validators.required],
    status: ['P'] // Default: Pending
  });

  // 🔄 State variables
  submitted = false;
  showAlert = false;
  alertMessage = '';
  alertType: 'error' | 'success' = 'error';
  today: Date = new Date();
  userPhoto: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private http: HttpClient,
    private uploadService: UploadService
  ) {
    // 🔁 Load previously saved image from localStorage (optional)
    const savedPhoto = localStorage.getItem('userPhoto');
    if (savedPhoto) this.userPhoto = savedPhoto;
  }

  // 📌 Form control getters
  get name() { return this.taskForm.get('name'); }
  get description() { return this.taskForm.get('description'); }
  get targetDate() { return this.taskForm.get('targetDate'); }

  // ✅ Validation helper methods
  hasNameError(errorType: string): boolean {
    return this.name?.hasError(errorType) && (this.name?.dirty || this.name?.touched || this.submitted) || false;
  }

  hasDescriptionError(errorType: string): boolean {
    return this.description?.hasError(errorType) && (this.description?.dirty || this.description?.touched || this.submitted) || false;
  }

  hasTargetDateError(errorType: string): boolean {
    return this.targetDate?.hasError(errorType) && (this.targetDate?.dirty || this.targetDate?.touched || this.submitted) || false;
  }

  // 📝 On Form Submit
  onSubmit() {
    this.submitted = true;

    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      const newTask: Task = {
        id: Date.now(),
        name: formValue.name ?? '',
        description: formValue.description ?? '',
        startDate: formValue.startDate ?? '',
        endDate: formValue.endDate ?? '',
        targetDate: formValue.targetDate ?? '',
        status: (formValue.status as 'P' | 'C') ?? 'P'
      };

      // 👇 Call service or HTTP POST here
      this.taskService.addTask(newTask)

      this.showCustomAlert('✅ Task ready to submit', 'success');
      this.taskForm.reset({ status: 'P' });
      this.submitted = false;
    } else {
      this.showCustomAlert('❌ Please fill all required fields correctly!', 'error');
      this.taskForm.markAllAsTouched();
    }
  }

  // 📢 Show alert message
  showCustomAlert(message: string, type: 'error' | 'success') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 4000);
  }

  closeAlert() {
    this.showAlert = false;
  }

  // 📂 Trigger file input manually
  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.click();
  }

  // 🖼️ Image upload + preview + POST to backend
  onPhotoSelected(event: any) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('photo', file);

      // ❌ No need to manually set Content-Type for FormData
      this.http.post('http://localhost:3000/upload', formData).subscribe({
        next: (res) => {
          console.log('✅ Upload successful:', res);
          this.showCustomAlert('Image uploaded successfully!', 'success');
        },
        error: (err) => {
          console.error('❌ Upload failed:', err);
          this.showCustomAlert('Failed to upload image', 'error');
        }
      });

      // 🖼️ Show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPhoto = e.target.result;
        localStorage.setItem('userPhoto', this.userPhoto ?? '');
      };
      reader.readAsDataURL(file);
    } else {
      this.showCustomAlert('❌ Please select a valid image file!', 'error');
    }
  }
}
