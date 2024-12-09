import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStockInfoComponent } from './general-stock-info.component';

describe('GeneralStockInfoComponent', () => {
  let component: GeneralStockInfoComponent;
  let fixture: ComponentFixture<GeneralStockInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralStockInfoComponent]
    });
    fixture = TestBed.createComponent(GeneralStockInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
