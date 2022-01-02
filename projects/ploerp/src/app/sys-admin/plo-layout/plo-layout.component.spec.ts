import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloLayoutComponent } from './plo-layout.component';

describe('PloLayoutComponent', () => {
  let component: PloLayoutComponent;
  let fixture: ComponentFixture<PloLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PloLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PloLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
