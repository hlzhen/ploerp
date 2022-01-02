import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloSiderComponent } from './plo-sider.component';

describe('PloSiderComponent', () => {
  let component: PloSiderComponent;
  let fixture: ComponentFixture<PloSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PloSiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PloSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
