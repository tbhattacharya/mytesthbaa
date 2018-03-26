import { MOCK } from './../../model/mock';
import { GeneralEnquiries } from './../../model/enquiry';
import { RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Constant } from '../constants/constants';
import { ID_MOCK } from '../../model/identity';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {
    public initComplete = new Subject<any>();
    public baseUrl = 'http://dxau1wmb01:7080/homebase/';

    constructor(private http: HttpClient) {
        switch (environment.envName) {
            case 'dev':
                this.baseUrl = 'http://txau1wmb01:7080/homebase/';
                break;
            case 'qa':
                this.baseUrl = 'https://huki-ictest.bunnings-ext.azure.haylix.net/homebase/';
                break;
            case 'prod':
                this.baseUrl = 'https://team.homebase.co.uk/homebase/';
                break;
            default:
                this.baseUrl = 'http://dxau1wmb01:7080/homebase/';
        }
    }

    public checkEmployeeId(empid: string): Observable<any> {
        let url: string = this.baseUrl + 'identity';
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
        let url: string = this.baseUrl + 'item' + params;
        if (Constant.MODE == 0) {
            return this.http.get<GeneralEnquiries>(url);
        } else {
            let data: GeneralEnquiries = JSON.parse(MOCK);
            return Observable.of(data);
        }
    }
}
