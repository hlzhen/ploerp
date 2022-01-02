import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloLockComponent } from './plo-lock.component';

describe('PloLockComponent', () => {
  let component: PloLockComponent;
  let fixture: ComponentFixture<PloLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PloLockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PloLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
