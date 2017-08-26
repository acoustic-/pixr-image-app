import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import _ from 'lodash';

@Injectable()
export class UsersService {

  public users = [];
  public albums = [];
  private baseUrl = environment.api;

  constructor(private http: Http) {
    this.getUsers().subscribe(res => {
      this.users = res;
    })

    this.http.get(this.baseUrl + '/albums/').map((res:any) => res.json()).subscribe(res => {
      this.albums = res;
    })
  }
  public getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/users').map((res:any) => res.json());
  }

  public getUser(userId: string): Observable<any> {
    return this.http.get(this.baseUrl + '/users/' + userId).map((res:any) => res.json());
  }

  public getUserName(userId: string): string {
    if (this.users) {
      let user = _.find(this.users, {id: userId});
      return user !== undefined ? user['username'] : "";
    }
  }

  public getUserNameByAlbum(albumId: string): string {
    if (this.albums) {
      let userId = _.find(this.albums, {id: albumId})['userId'];
      return this.getUserName(userId);
    }
  }

  public getUserIdByAlbum(albumId: string): string {
    if (this.albums) {
      return _.find(this.albums, {id: albumId})['userId'];
    }
  }
}
