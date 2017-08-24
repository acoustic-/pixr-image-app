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
  private thumbnail: string = "";

  constructor(private resources: ResourcesService) { 
  }

  ngOnInit() {
    console.log("photo", this.photoId)
    this.resources.getPhoto(this.photoId).subscribe(res => {

      this.photo = res;
      console.log("photo is", res);
      this.thumbnail = this.photo['thumbnailUrl'];
    });
  }

  private showLargerPhoto() {
    console.log("clikec photo", this.photo)
    this.photoSelected.emit(this.photo);
  }
}
