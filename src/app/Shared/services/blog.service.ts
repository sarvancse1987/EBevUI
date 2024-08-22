import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_GATEWAY } from 'src/environments/environment';
import { CommonService } from '../helpers/common.service';
import { HttpService } from '../helpers/http-service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiURL: string;
  private serviceUrl: string = '';

  constructor(private httpClient: HttpService) {
    this.apiURL = API_GATEWAY.SERVER + "/blog";
  }

  public getAll(): Observable<any> {
    this.serviceUrl = this.apiURL + "/all";
    return this.httpClient.getAll(this.serviceUrl);
  }

  public get(id: any): Observable<any> {
    this.serviceUrl = this.apiURL + "/get";
    return this.httpClient.getMultipleParam(this.serviceUrl, id);
  }

  public add(blog: any): Observable<any> {
    this.serviceUrl = this.apiURL + "/add";
    return this.httpClient.post(this.serviceUrl, blog);
  }

  public update(blog: any): Observable<any> {
    this.serviceUrl = this.apiURL + "/update";
    return this.httpClient.post(this.serviceUrl, blog);
  }

  public delete(blogId: number): Observable<any> {
    this.serviceUrl = this.apiURL + "/delete";
    return this.httpClient.delete(this.serviceUrl, blogId);
  }
}
