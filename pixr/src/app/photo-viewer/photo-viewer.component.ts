import { Component, OnInit, Input } from '@angular/core';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit {
  @Input() photoId: string;
  private photo: object;

  constructor(private resources: ResourcesService) { }

  ngOnInit() {
    console.log("photo", this.photoId)
    this.resources.getPhoto(this.photoId).subscribe(res => {this.photo = res});
  }

}
