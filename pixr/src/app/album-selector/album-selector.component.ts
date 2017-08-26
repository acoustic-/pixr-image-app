import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'app-album-selector',
  templateUrl: './album-selector.component.html',
  styleUrls: ['./album-selector.component.css']
})
export class AlbumSelectorComponent implements OnInit {

  @Output() albumChanged = new EventEmitter();

  private albums: Array<object> = [];
  private currentAlbum: object;

  constructor(private resources: ResourcesService) { }

  ngOnInit() {
    this.resources.getAlbums().subscribe(res => {
      this.albums = res.sort((a,b) => {
        if (a['title'] < b['title']) {
          return -1;
        } else if (a['title'] > b['title'] ) {
          return 1;
        } else {
          return 0;
        }
      })
      
      if (this.albums && this.albums.length) {
        this.currentAlbum = this.albums[0];
        this.changeAlbum(this.currentAlbum);
      }
    });
  }

  private changeAlbum(album: object) {
    this.currentAlbum = album;
    this.albumChanged.emit(this.currentAlbum);
  }

}
