import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-large-photo-viewer',
  templateUrl: './large-photo-viewer.component.html',
  styleUrls: ['./large-photo-viewer.component.css']
})
export class LargePhotoViewerComponent implements OnInit {
  private photo: object;
  private previousPhoto: object;
  private nextPhoto: object;
  private photoUrl: string = "";
  private display: boolean = false;

  @Output() changePhoto = new EventEmitter();

  constructor() { }
  
  ngOnInit() {
  }

  public setPhoto(photo: object, previous: object, next: object) {
    console.log("photo set!", photo, previous, next)
    this.photo = photo;
    this.previousPhoto = previous;
    this.nextPhoto = next;
    this.photoUrl = this.photo['url'];
    this.display = true;
  }

  private close() {
    console.log("Close large photo viewer")
    this.display = false;
  }

  private setNextPhoto() {
    console.log("try set", this.nextPhoto)
    if (this.nextPhoto !== null) {
      this.changePhoto.emit(this.nextPhoto);
    }
  }

  public setPreviousPhoto() {
    console.log("try set", this.previousPhoto)
    if (this.previousPhoto !== null) {
      this.changePhoto.emit(this.previousPhoto);
    }
  }

  public previousPhotoExists(): boolean {
    return this.previousPhoto !== null;
  }

  private nextPhotoExists(): boolean {
    console.log("nextPhotoExists", this.nextPhoto !== null)
    return this.nextPhoto !== null;
  }
}
