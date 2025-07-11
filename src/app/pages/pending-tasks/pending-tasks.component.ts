import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit {
  @ViewChild('screenshotTarget') screenshotTarget!: ElementRef;
  
  tasks: Task[] = [];
  today: Date = new Date();

  constructor(private taskService: TaskService, private http: HttpClient) {}

  ngOnInit() {
    this.taskService.getTasksObservable().subscribe(all => {
      this.tasks = all.filter(t => t.status === 'P');
    });
  }

  markCompleted(task: Task) {
    task.status = 'C';
    this.taskService.updateTask(task);
    alert('Marked as completed');
  }
  getStatusText(status: string): string {
    return status === 'C' ? 'Completed' : 'Pending';
  }

  takeScreenshot() {
    if (!this.screenshotTarget) {
      alert('Screenshot target not found!');
      return;
    }

    const element = this.screenshotTarget.nativeElement;

    // Configure html2canvas options for better quality
    const options = {
      backgroundColor: '#ffffff',
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0
    };

    html2canvas(element, options).then(canvas => {
      canvas.toBlob((blob) => {
        if (blob) {
          this.uploadScreenshot(blob);
          
          // Optional: also download locally
          this.downloadScreenshot(canvas);
        }
      }, 'image/png', 0.9);
    }).catch(error => {
      console.error('Screenshot capture failed:', error);
      alert('❌ Failed to capture screenshot');
    });
  }

  uploadScreenshot(blob: Blob) {
    const formData = new FormData();
    formData.append('screenshot', blob, `pending-tasks-${new Date().getTime()}.png`);

    // Add authorization headers if needed
    const headers = {
      'Authorization': 'Bearer yourTokenHere' // Replace with actual token
    };

    this.http.post('http://localhost:3000/upload', formData).subscribe({
      next: (res) => {
        console.log('✅ Screenshot uploaded successfully:', res);
        alert('✅ Screenshot uploaded successfully!');
      },
      error: (err) => {
        console.error('❌ Upload failed:', err);
        alert('❌ Screenshot upload failed');
      }
    });
  }

  downloadScreenshot(canvas: HTMLCanvasElement) {
    // Create download link for local save
    const link = document.createElement('a');
    link.download = `pending-tasks-${new Date().getTime()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }
}