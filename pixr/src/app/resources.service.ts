import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ResourcesService {

  private baseUrl = environment.api;

  constructor(private http: Http) {
  }

  public getAlbums(): Observable<any>  {
    return this.http.get(this.baseUrl + "/albums").map((res: any) => res.json());
  }

  public getPhotosInAlbum(albumId: string): Observable<any> {
    return this.http.get(this.baseUrl + "/albums/" + albumId + "/photos").map((res: any) => res.json());
  }

  public getSubsetOfPhotosInAlbum(albumId: string, page: number, limit: number): Observable<any> {
    return this.http.get(this.baseUrl + "/albums/" + albumId + "/photos?_limit="+ limit + "&_page=" + page).map((res: any) => res.json());
  }

  public getPhoto(photoId: string): Observable<any> {
    return this.http.get(this.baseUrl + "/photos/" + photoId).map((res: any) => res.json());
  }
}
