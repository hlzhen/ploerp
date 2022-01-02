import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloPageHeaderComponent } from './plo-page-header.component';

describe('PloPageHeaderComponent', () => {
  let component: PloPageHeaderComponent;
  let fixture: ComponentFixture<PloPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PloPageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PloPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
