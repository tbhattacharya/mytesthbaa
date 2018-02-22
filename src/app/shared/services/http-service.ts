import { RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

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
}
