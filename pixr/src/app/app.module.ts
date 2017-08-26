import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { AppComponent } from './app.component';
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { ResourcesService } from './resources.service';
import { UsersService } from './users.service';
import { PaginationComponent } from './pagination/pagination.component';
import { AlbumSelectorComponent } from './album-selector/album-selector.component';
import { PhotoViewerComponent } from './photo-viewer/photo-viewer.component';
import { LargePhotoViewerComponent } from './large-photo-viewer/large-photo-viewer.component';
import { CountoModule }  from 'angular2-counto';
import { UserViewerComponent } from './user-viewer/user-viewer.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    AlbumViewerComponent,
    PaginationComponent,
    AlbumSelectorComponent,
    PhotoViewerComponent,
    LargePhotoViewerComponent,
    UserViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CountoModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFRnoqhcBVn8BCHmN8EZNHvh4GOUGd-YA'
    })
  ],
  providers: [ResourcesService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
