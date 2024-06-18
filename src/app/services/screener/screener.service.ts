import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {

  constructor(
    private http : HttpClient
  ) { }

  getScreenerData(searchTerm: any , cookieData : any ) {
    let reqobj = {
      csrfToken : cookieData.csrfToken,
      sessionId : cookieData.sessionId,
      searchTerm : searchTerm.trim()
    }

    return this.http.post(`http://localhost:8000/convert`,reqobj)
  }
}
