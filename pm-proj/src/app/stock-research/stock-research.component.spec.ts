import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockResearchComponent } from './stock-research.component';

describe('StockResearchComponent', () => {
  let component: StockResearchComponent;
  let fixture: ComponentFixture<StockResearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockResearchComponent]
    });
    fixture = TestBed.createComponent(StockResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
