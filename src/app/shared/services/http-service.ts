import { MOCK } from './../../model/mock';
import { GeneralEnquiries } from './../../model/enquiry';
import { RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HttpService {
    public initComplete = new Subject<any>();

    constructor(private http: HttpClient) {
    }

    public checkCaptcha(captcha: string): Observable<any> {
        let header = new HttpHeaders();
        header.set('Access-Control-Allow-Origin', '*');
        header.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        header.set('Content-Type', 'application/x-www-form-urlencoded')
        let url: string = 'https://www.google.com/recaptcha/api/siteverify';
        return this.http.post(url, {
            'secret': '6LdyR0cUAAAAAKkbH9NJ469L59mKWYWbVb32lXYa',
            'response': captcha
        }, { headers: header });
    }

    public fetchDataForItem(article: string, site: string): GeneralEnquiries {
        let header = new HttpHeaders();
        header.set('Access-Control-Allow-Origin', '*');
        header.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        header.set('Content-Type', 'application/x-www-form-urlencoded')
        let params = new HttpParams();
        params.set('article', article);
        params.set('site', site);
        let url: string = 'http://dxau1wmb01:7080/homebase/api';
        //return this.http.get(url, {params: params});
        let data: GeneralEnquiries = JSON.parse(MOCK).GeneralEnquiries;
        this.initComplete.next(data);
        this.initComplete.complete();
        console.log('IN Service')
        //return this.initComplete.asObservable();
        return data;
    }
}
