import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  finalSearchCriteria: string;

  constructor(private http: HttpClient) { }

  getBooks(criteria): Observable<any> {
    this.finalSearchCriteria = `/api/books?name=${criteria.name}&title=${criteria.title}`;
    console.log(this.finalSearchCriteria);
    return this.http.get(`${environment.api_url}${this.finalSearchCriteria}`);
  }

  getBook(criteria): Observable<any> {
    return this.http.get(`${environment.api_url}/api/books/${criteria}`);
  }

}
