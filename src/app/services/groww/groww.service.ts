import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrowwService {

  constructor(
    private http : HttpClient
  ) { }

  topGainer() {
    return this.http.get(`http://localhost:8000/groww/topGainer`)
  }
}
