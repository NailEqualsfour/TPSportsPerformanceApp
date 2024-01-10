import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrecoveryComponent } from './interrecovery.component';

describe('InterrecoveryComponent', () => {
  let component: InterrecoveryComponent;
  let fixture: ComponentFixture<InterrecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterrecoveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterrecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
