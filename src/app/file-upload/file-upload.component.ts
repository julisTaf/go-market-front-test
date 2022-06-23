import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from '../shared/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() id = ''; 

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  // @ts-ignore
  file: File = null; // Variable to store file

  // Inject service
  constructor(
    private fileUploadService: FileUploadService,
    private router : Router,
    ) { }

  ngOnInit(): void {
  }

  // On file Select
  // @ts-ignore
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file,this.id).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable
        }
      }
    );
    this.router.navigate(['list']);
  }
}
