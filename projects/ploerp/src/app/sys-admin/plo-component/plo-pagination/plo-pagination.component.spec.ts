import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PloPaginationComponent } from './plo-pagination.component';

describe('PloPaginationComponent', () => {
  let component: PloPaginationComponent;
  let fixture: ComponentFixture<PloPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PloPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PloPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
