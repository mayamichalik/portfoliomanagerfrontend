import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistComponentComponent } from './watchlist-component.component';

describe('WatchlistComponentComponent', () => {
  let component: WatchlistComponentComponent;
  let fixture: ComponentFixture<WatchlistComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchlistComponentComponent]
    });
    fixture = TestBed.createComponent(WatchlistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
