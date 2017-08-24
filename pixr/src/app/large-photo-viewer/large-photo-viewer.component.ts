import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-large-photo-viewer',
  templateUrl: './large-photo-viewer.component.html',
  styleUrls: ['./large-photo-viewer.component.css']
})
export class LargePhotoViewerComponent implements OnInit {
  private photo: object;
  private photoUrl: string = "";
  private display: boolean = false;

  constructor() { }
  
  ngOnInit() {
    console.log("display", this.display)
  }

  public setPhoto(photo: object) {
    console.log("photo set!")
    this.photo = photo;
    this.photoUrl = this.photo['url'];
    this.display = true;
  }

  private close() {
    this.display = false;
  }

}
