import { Component, OnInit, Input } from '@angular/core';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.css']
})
export class AlbumViewerComponent implements OnInit {

  private images: Array<object> = [];
  private currentAlbum: string = "";
  private currentPage: number = 1;
  private limit: number = 8;

  constructor(private resources: ResourcesService) { }

  ngOnInit() {
  }

  private onPaginationChanged(pagination: object) {
    this.currentPage = pagination['page'];
    this.limit = pagination['limit'];
    this.updatePhotos();    
  }

  private updatePhotos() {
    this.resources.getSubsetOfPhotosInAlbum(
      this.currentAlbum, 
      this.currentPage, 
      this.limit).subscribe(res => {
      this.images = res;
    })
  }

  private onAlbumChanged(album: any) {
    this.currentAlbum = album;
    this.updatePhotos();
  }
}
