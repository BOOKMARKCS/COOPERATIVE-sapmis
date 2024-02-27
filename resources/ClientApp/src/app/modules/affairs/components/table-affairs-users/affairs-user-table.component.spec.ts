import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairsUserTableComponent } from './affairs-user-table.component';

describe('TableAffairsUsersComponent', () => {
  let component: AffairsUserTableComponent;
  let fixture: ComponentFixture<AffairsUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffairsUserTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffairsUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
