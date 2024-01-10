import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertjumpComponent } from './vertjump.component';

describe('VertjumpComponent', () => {
  let component: VertjumpComponent;
  let fixture: ComponentFixture<VertjumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VertjumpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VertjumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
