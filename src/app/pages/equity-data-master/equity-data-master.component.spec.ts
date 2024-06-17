import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityDataMasterComponent } from './equity-data-master.component';

describe('EquityDataMasterComponent', () => {
  let component: EquityDataMasterComponent;
  let fixture: ComponentFixture<EquityDataMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquityDataMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquityDataMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
