import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { serverHost } from 'environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

// API url
  baseApiUrl = serverHost.EndPoint + "/public/upload/"

  constructor(private http:HttpClient) { }

// Returns an observable
  // @ts-ignore
  upload(file,id: any):Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseApiUrl + id, formData)
  }
}
