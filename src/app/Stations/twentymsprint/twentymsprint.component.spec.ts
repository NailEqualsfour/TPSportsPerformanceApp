import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentymsprintComponent } from './twentymsprint.component';

describe('TwentymsprintComponent', () => {
  let component: TwentymsprintComponent;
  let fixture: ComponentFixture<TwentymsprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentymsprintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwentymsprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
