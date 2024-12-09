import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtStocksComponent } from './bought-stocks.component';

describe('BoughtStocksComponent', () => {
  let component: BoughtStocksComponent;
  let fixture: ComponentFixture<BoughtStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoughtStocksComponent]
    });
    fixture = TestBed.createComponent(BoughtStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
