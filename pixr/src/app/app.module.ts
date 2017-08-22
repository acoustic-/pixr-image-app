import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { AppComponent } from './app.component';
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { ResourcesService } from './resources.service';
import { PaginationComponent } from './pagination/pagination.component';
import { AlbumSelectorComponent } from './album-selector/album-selector.component';
import { PhotoViewerComponent } from './photo-viewer/photo-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumViewerComponent,
    PaginationComponent,
    AlbumSelectorComponent,
    PhotoViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ResourcesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
