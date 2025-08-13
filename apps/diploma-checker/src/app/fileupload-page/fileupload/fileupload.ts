import { Component } from '@angular/core';

@Component({
  selector: 'app-fileupload',
  imports: [],
  templateUrl: './fileupload.html',
  styleUrl: './fileupload.scss'
})
export class Fileupload {
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
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed!');
      return;
    }
    console.log('Selected file:', file);

  }
}
