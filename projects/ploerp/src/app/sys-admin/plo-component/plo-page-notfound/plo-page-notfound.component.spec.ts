import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloPageNotfoundComponent } from './plo-page-notfound.component';

describe('PloPageNotfoundComponent', () => {
  let component: PloPageNotfoundComponent;
  let fixture: ComponentFixture<PloPageNotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PloPageNotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PloPageNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
