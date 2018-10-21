import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonhttpService {

  constructor(private http: HttpClient) { }

  /* Get all service categories */
  public getCategoryServices() {
    return this.http.get(AppSettings.API_ENDPOINT + 'services')
                    .map((res: Response) => {
                      return res;
                    })
                    .catch((error: any) => {
                      console.log(error);
                      return Observable.throw(error);
                    });
  }

  /* Get all states */
  public getStates() {
    return this.http.get(AppSettings.API_ENDPOINT + 'states')
                    .map((res: Response) => {
                      return res;
                    })
                    .catch((error: any) => {
                      console.log(error);
                      return Observable.throw(error);
                    });
  }

  /* Get all cities w.r.t state_id */
  public getCitiesFromStateId(state_id) {
    return this.http.get(AppSettings.API_ENDPOINT+'cities/'+state_id)
               .map((res: Response) => {
                 return res;
               })
               .catch((error: any) => {
                 console.log(error);
                 return Observable.throw(error);
               });
  }
}
