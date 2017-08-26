import { Component, OnInit, Output, EventEmitter, HostListener  } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}

@Component({
  selector: 'app-large-photo-viewer',
  templateUrl: './large-photo-viewer.component.html',
  styleUrls: ['./large-photo-viewer.component.css']
})
export class LargePhotoViewerComponent implements OnInit {
  private photo: object;
  private previousPhoto: object;
  private nextPhoto: object;
  public photoUrl: string = "";
  public photoTitle: string = "";
  public display: boolean = false;
  public displayInfo: boolean = true;
  public SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  @Output() changePhoto = new EventEmitter();

  constructor() { }
  
  ngOnInit() {
  }

  public setPhoto(photo: object, previous: object, next: object) {
    this.photo = photo;
    this.previousPhoto = previous;
    this.nextPhoto = next;
    this.photoUrl = this.photo['url'].replace("http", "https");;
    this.photoTitle = this.photo['title'];
    this.display = true;
  }

  public close() {
    this.display = false;
  }

  public setNextPhoto() {
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

  public nextPhotoExists(): boolean {
    return this.nextPhoto !== null;
  }

  public toggleInfo() {
    this.displayInfo = !this.displayInfo;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.setNextPhoto();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.setPreviousPhoto();
    }

    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.close();
    }
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    // swipe right, next avatar
    if (action === this.SWIPE_ACTION.RIGHT) {
        this.setNextPhoto();
    }

    // swipe left, previous avatar
    if (action === this.SWIPE_ACTION.LEFT) {
        this.setPreviousPhoto();
    }
  }
}
