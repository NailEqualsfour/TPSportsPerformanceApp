import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandeyeComponent } from './handeye.component';

describe('HandeyeComponent', () => {
  let component: HandeyeComponent;
  let fixture: ComponentFixture<HandeyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandeyeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandeyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
