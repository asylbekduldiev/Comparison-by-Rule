import { Component, inject } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fileupload',
  imports: [],
  templateUrl: './fileupload.html',
  styleUrl: './fileupload.scss',
  standalone: true,
})
export class Fileupload {
  http = inject(HttpClient)
  isDragOver = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    const filedata = new FormData
    filedata.append("file",file)

    this.http.post('http://localhost:8080/file-upload', filedata, {
      observe: 'response',
      responseType: 'blob'
    }).subscribe({
      next: (res) => {
        // успешный ответ — blob
        const blob = res.body as Blob;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.txt';
        a.click();
      },
      error: (err) => {
        const blob = err.error as Blob;
        blob.text().then(text => {
          console.error('Ошибка от сервера:', text);
          alert(text);
        });
      }
    });
  }
}
