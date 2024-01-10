import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineballComponent } from './medicineball.component';

describe('MedicineballComponent', () => {
  let component: MedicineballComponent;
  let fixture: ComponentFixture<MedicineballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicineballComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicineballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
