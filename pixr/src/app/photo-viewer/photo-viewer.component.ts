import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit {
  @Input() photoId: string;
  @Output() photoSelected: EventEmitter<any> = new EventEmitter();
  private photo: object;
  public thumbnail: string = "";
  public thumbnailTitle: string = "";

  constructor(private resources: ResourcesService) { 
  }

  ngOnInit() {
    this.resources.getPhoto(this.photoId).subscribe(res => {
      this.photo = res;
      this.thumbnailTitle = this.photo['title'];
      this.thumbnail = this.photo['thumbnailUrl'].replace("http", "https");
    });
  }

  public showLargerPhoto() {
    this.photoSelected.emit(this.photo);
  }
}
