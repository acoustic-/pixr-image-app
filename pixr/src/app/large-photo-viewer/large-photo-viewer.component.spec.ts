import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargePhotoViewerComponent } from './large-photo-viewer.component';

describe('LargePhotoViewerComponent', () => {
  let component: LargePhotoViewerComponent;
  let fixture: ComponentFixture<LargePhotoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LargePhotoViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LargePhotoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
