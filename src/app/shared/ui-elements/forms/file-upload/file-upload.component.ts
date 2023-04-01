import { Component, AfterViewInit, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { FileUpload } from 'src/app/shared/ui-elements/forms/file-upload/file-upload';
import { GlobalJsFunctionsService } from 'src/app/shared/services/global-js-functions.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements AfterViewInit {

  @ViewChild('dropArea') dropArea: ElementRef;
  @ViewChild('inputFile') inputFile: ElementRef;

  @Input() isBigArea: boolean;
  @Input() otherFieldRequired: boolean;
  @Input() progressComplete: boolean;
  @Input() progressPercent: number;
  @Input() multiple;

  @Output() fileChange = new EventEmitter();
  @Output() invalidUntil = new EventEmitter();

  files: FileUpload[] = [];

  constructor(private renderer: Renderer2, private globalJs: GlobalJsFunctionsService) { }

  ngAfterViewInit() {
    const inputFileElement = this.inputFile.nativeElement as HTMLElement;
    const dropAreaElement = this.dropArea.nativeElement as HTMLElement;

    const handleDragEvent = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.renderer.addClass(dropAreaElement, 'active');
    };
    const handleDropEvent = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.renderer.removeClass(dropAreaElement, 'active');
    };
    inputFileElement.addEventListener('dragover', handleDragEvent);
    inputFileElement.addEventListener('dragenter', handleDragEvent);
    inputFileElement.addEventListener('dragleave', handleDropEvent);
    inputFileElement.addEventListener('dragend', handleDropEvent);
    inputFileElement.addEventListener('drop', handleDropEvent);
  }

  // select a file
  selectFile() {
    this.fileChange.emit((this.inputFile.nativeElement as HTMLInputElement).files);
  }

  // click on the prevent layer
  invalidUntilLayerClicked() {
    this.invalidUntil.emit();
  }

  // get selected files from input type file
  getFiles() {
    const files = (this.inputFile.nativeElement as HTMLInputElement).files;

    this.files = Array.from(files).map((file: File) => {
      return {
        name: file.name,
        size: file.size,
        type: file.type
      };
    });

    this.selectFile();
  }

  // convert size in bytes to KB, MB, GB
  formatBytes(bytes, decimals?) {
    return this.globalJs.formatBytes(bytes, decimals);
  }
}
