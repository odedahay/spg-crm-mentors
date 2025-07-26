import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutFunctionalityComponent } from './logged-out-functionality.component';

describe('LoggedOutFunctionalityComponent', () => {
  let component: LoggedOutFunctionalityComponent;
  let fixture: ComponentFixture<LoggedOutFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedOutFunctionalityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedOutFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
