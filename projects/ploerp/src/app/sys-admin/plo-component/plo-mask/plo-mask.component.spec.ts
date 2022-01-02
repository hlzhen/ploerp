import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloMaskComponent } from './plo-mask.component';

describe('PloMaskComponent', () => {
  let component: PloMaskComponent;
  let fixture: ComponentFixture<PloMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PloMaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PloMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
