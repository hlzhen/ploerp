import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloHeaderComponent } from './plo-header.component';

describe('PloHeaderComponent', () => {
  let component: PloHeaderComponent;
  let fixture: ComponentFixture<PloHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PloHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PloHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
