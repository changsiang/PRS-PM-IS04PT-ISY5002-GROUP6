import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  //private rootUrl = "http://localhost:8005/v1/aeye_detection/best/";
  private rootUrl = `${window.location.protocol}//${window.location.host}/v1/aeye_detection/best/`;
  private annotate = "annotate/b64";
  private predict = "predict/b64";
  private httpHeader = new HttpHeaders({
    'accept': 'application/json',
  });
  private rtAnnotateImg = ''
  private ltAnnotateImg = ''
  private rtLabels = []
  private ltLabels = []

  constructor(private http: HttpClient) { }


  setRtAnnotateImg(img: string): void {
    this.rtAnnotateImg = img
  }

  getRtAnnotateImg(): string {
    return this.rtAnnotateImg
  }

  setLtAnnotateImg(img: string): void {
    this.ltAnnotateImg = img
  }
  
  getLtAnnotateImg(): string {
    return this.ltAnnotateImg
  }

  setLtLabels(labels: any): void {
    this.ltLabels = labels;
  }

  getLtLabels(): any {
    return this.ltLabels;
  }

  setRtLabels(labels: any): void {
    this.rtLabels = labels;
  }

  getRtLabels(): any {
    return this.rtLabels;
  }

  getAnnotations(base64Img: String): Observable<any> {
      const payload = {
        payload: base64Img
      }
      return this.http.post(`${this.rootUrl}${this.annotate}`, payload, { headers: this.httpHeader })
  }

  getPredictions(base64Img: String): Observable<any> {
    const payload = {
      payload: base64Img
    }
    return this.http.post(`${this.rootUrl}${this.predict}`, payload, { headers: this.httpHeader })
  }
}
