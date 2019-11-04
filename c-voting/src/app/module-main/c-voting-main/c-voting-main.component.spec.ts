import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVotingMainComponent } from './c-voting-main.component';

describe('CVotingMainComponent', () => {
  let component: CVotingMainComponent;
  let fixture: ComponentFixture<CVotingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVotingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVotingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
