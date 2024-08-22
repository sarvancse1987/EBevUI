import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { API_GATEWAY } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {
    }

    public getAll<T>(requestUrl: string): Observable<T> {
        return this.http.get<T>(requestUrl);
    }

    public getAllSync<T>(requestUrl: string): Observable<T> {
        return this.http.get<T>(requestUrl);
    }

    public getSingle<T>(requestUrl: string, id: number): Observable<T> {
        return this.http.get<T>(requestUrl + "/" + id);

    }

    public getSingleObject(requestUrl: string, id: number): Observable<any> {
        return this.http.get(requestUrl + "/" + id);
    }

    public getByText<T>(requestUrl: string, id: string): Observable<T> {
        return this.http.get<T>(requestUrl + "/" + id);
    }

    public getByTextSync<T>(requestUrl: string, id: string): Observable<T> {
        return this.http.get<T>(requestUrl + "/" + id).pipe(map((res) => res));
    }

    public post<T>(requestUrl: string, item: any): Observable<T> {
        const toBeAdd = JSON.stringify(item);
        return this.http.post<T>(requestUrl, toBeAdd);
    }

    public update<T>(requestUrl: string, id: number, itemToUpdate: any): Observable<T> {
        return this.http.put<T>(requestUrl + "/" + id, JSON.stringify(itemToUpdate));
    }

    public delete<T>(requestUrl: string, id: number): Observable<T> {
        return this.http.delete<T>(requestUrl + "/" + id);
    }

    public getMultipleParam<T>(requestUrl: string, objects: any): Observable<T> {
        const paramValue = this.buildQueryParams(objects);
        return this.http.get<T>(requestUrl, { params: paramValue });
    }

    public buildQueryParams(source: any): HttpParams {
        let target: HttpParams = new HttpParams();
        Object.keys(source).forEach((key: string) => {
            const value: string | number | boolean | Date = source[key];
            if ((typeof value !== 'undefined') && (value !== null)) {
                target = target.append(key, value.toString());
            }
        });
        return target;
    }
}


@Injectable()
export class AccountHttpInterceptor implements HttpInterceptor {
    constructor(private _commonservice: CommonService, private spinner: NgxSpinnerService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        if (!request.headers.has('Access-Control-Allow-Origin')) {
            request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        if (!request.headers.has('Accept')) {
            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        }

        if (!request.headers.has('Authorization')) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token')) });
        }

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.spinner.hide();
                }
            }, error => {
                if (error != null) {
                    if (error.hasOwnProperty('status') && error.status == 401) {
                        this._commonservice.signOut();
                    }
                }
                this._commonservice.ShowError("Some error occured please contact administrator");
                this.spinner.hide();
            })
        );
    }
}
