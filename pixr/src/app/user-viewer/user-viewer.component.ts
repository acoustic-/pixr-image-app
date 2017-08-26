import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-viewer',
  templateUrl: './user-viewer.component.html',
  styleUrls: ['./user-viewer.component.css']
})
export class UserViewerComponent implements OnInit {

  public width: number = 0;
  public lat: number = 0;
  public lng: number = 0;
  public user: object;
  public address: object;
  public company: object;

  constructor(private users: UsersService) { }

  ngOnInit() {
  }

  public toggle() {
    console.log("User view was toggled")
    if (this.width === 0) {
      this.width = 250;
    } else {
      this.width = 0;
    }
  }

  public hide() {
    this.width = 0;
  }

  public setUser(userId) {
    this.users.getUser(userId).subscribe(res => {
      this.user = res;
      this.address = this.user['address']
      this.company = this.user['company'];

      let g = this.address['geo'];
      if (g) {
        this.lat = parseFloat(g['lat']);
        this.lng = parseFloat(g['lng']);
        console.log(g['lat'], this.lat)
      }

      this.toggle();
    })
  }
}
