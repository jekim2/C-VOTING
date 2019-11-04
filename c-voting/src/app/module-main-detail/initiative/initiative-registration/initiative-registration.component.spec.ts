import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeRegistrationComponent } from './initiative-registration.component';

describe('InitiativeRegistrationComponent', () => {
  let component: InitiativeRegistrationComponent;
  let fixture: ComponentFixture<InitiativeRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
