import { Component } from '@angular/core';
import { ResourcesService } from './resources.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public statistics: {users: number, albums: number, photos: number} = {users: 0, albums: 0, photos: 0};
  Math: any;
  public greeting = "";

  constructor(private resources: ResourcesService, private users: UsersService) {
    this.Math = Math;
    this.resources.getAlbums().subscribe((res) => {
      this.statistics.albums = res.length;
    });

    this.resources.getPhotos().subscribe((res) => {
      this.statistics.photos = res.length;
    })

    this.users.getUsers().subscribe((res) => {
      this.statistics.users = res.length;
    })

    let date = new Date();
    let hour = date.getHours();
    if (hour >= 1 && hour < 5) {
      this.greeting = "Oletpa myöhään hereillä, mutta toivottavasti pian hyvää yötä!";
    } else if (hour >= 5 && hour < 12) {
      this.greeting = "Hyvää ja aurinkoista huomenta!";
    } else if (hour >= 12 && hour < 18) {
      this.greeting = "Vietä hauska iltapäivä!"
    } else if (hour >= 18 && hour < 22) {
      this.greeting = "Virkistävää iltaa!";
    } else {
      this.greeting = "Hyvää yötä, olet sen ansainnut!";
    }
  }

 

}
