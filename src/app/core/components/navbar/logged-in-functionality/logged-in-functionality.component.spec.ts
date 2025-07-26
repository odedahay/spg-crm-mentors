import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInFunctionalityComponent } from './logged-in-functionality.component';

describe('LoggedInFunctionalityComponent', () => {
  let component: LoggedInFunctionalityComponent;
  let fixture: ComponentFixture<LoggedInFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedInFunctionalityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
