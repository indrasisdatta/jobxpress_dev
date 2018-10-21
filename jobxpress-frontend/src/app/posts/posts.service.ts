import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  public addData(postFormData: any) {
    console.log('Post service sending data:', postFormData);

    // const headers = new HttpHeaders()
    //   .append('Content-Type', 'application/x-www-form-urlencoded')
    //   .append('Access-Control-Allow-Headers', 'Content-Type')
    //   .append('Access-Control-Allow-Methods', 'GET')
    //   .append('Access-Control-Allow-Origin', '*');

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*'
        })
      };


    return this.http.post(
        AppSettings.API_ENDPOINT + 'posts',
        postFormData
        // httpOptions
      )
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => {
        console.log('Service error caught:', error);
        return Observable.throw(error);
      });
  }

}
