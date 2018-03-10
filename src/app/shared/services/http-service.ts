import { MOCK } from './../../model/mock';
import { GeneralEnquiries } from './../../model/enquiry';
import { RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Constant } from '../constants/constants';
import { ID_MOCK } from '../../model/identity';

@Injectable()
export class HttpService {
    public initComplete = new Subject<any>();

    constructor(private http: HttpClient) {
    }

    public checkEmployeeId(empid: string): Observable<any> {
        let url: string = 'http://dxau1wmb01:7080/homebase/identity';
        if (Constant.MODE == 0) {
            return this.http.post(url, {
                'id': empid
            });
        } else {
            let data: GeneralEnquiries = JSON.parse(ID_MOCK);
            return Observable.of(data);
        }
    }

    public fetchDataForItem(article: string, site: string): Observable<GeneralEnquiries> {

        let params = '?article=' + article + '&site=' + site;
        let url: string = 'http://dxau1wmb01:7080/homebase/item' + params;
        if (Constant.MODE == 0) {
            return this.http.get<GeneralEnquiries>(url);
        } else {
            let data: GeneralEnquiries = JSON.parse(MOCK);
            return Observable.of(data);
        }
    }
}
