import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_GATEWAY } from 'src/environments/environment';
import { HttpService } from '../helpers/http-service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiURL: string;
  private serviceUrl: string = '';

  constructor(private httpClient: HttpService) {
    this.apiURL = API_GATEWAY.SERVER + "/person";
  }

  public getAll(): Observable<any> {
    this.serviceUrl = this.apiURL + "/all";
    return this.httpClient.getAll(this.serviceUrl);
  }

  public get(id: any): Observable<any> {
    this.serviceUrl = this.apiURL + "/get";
    return this.httpClient.getMultipleParam(this.serviceUrl, id);
  }

  public add(technology: any): Observable<any> {
    this.serviceUrl = this.apiURL + "/add";
    return this.httpClient.post(this.serviceUrl, technology);
  }

  public update(technology: any): Observable<any> {
    this.serviceUrl = this.apiURL + "/Update";
    return this.httpClient.post(this.serviceUrl, technology);
  }

  public delete(client: number): Observable<any> {
    this.serviceUrl = this.apiURL + "/Delete";
    return this.httpClient.getMultipleParam(this.serviceUrl, { client: client });
  }
}
