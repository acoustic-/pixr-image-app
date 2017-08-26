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
  private photoTitle: string = "";
  private display: boolean = false;
  private displayInfo: boolean = true;

  @Output() changePhoto = new EventEmitter();

  constructor() { }
  
  ngOnInit() {
  }

  public setPhoto(photo: object, previous: object, next: object) {
    this.photo = photo;
    this.previousPhoto = previous;
    this.nextPhoto = next;
    this.photoUrl = this.photo['url'];
    this.photoTitle = this.photo['title'];
    this.display = true;
  }

  private close() {
    this.display = false;
  }

  private setNextPhoto() {
    if (this.nextPhoto !== null) {
      this.changePhoto.emit(this.nextPhoto);
    }
  }

  public setPreviousPhoto() {
    if (this.previousPhoto !== null) {
      this.changePhoto.emit(this.previousPhoto);
    }
  }

  public previousPhotoExists(): boolean {
    return this.previousPhoto !== null;
  }

  private nextPhotoExists(): boolean {
    return this.nextPhoto !== null;
  }

  private toggleInfo() {
    this.displayInfo = !this.displayInfo;
  }
}
