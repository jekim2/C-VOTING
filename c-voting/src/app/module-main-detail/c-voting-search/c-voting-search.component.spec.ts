import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVotingSearchComponent } from './c-voting-search.component';

describe('CVotingSearchComponent', () => {
  let component: CVotingSearchComponent;
  let fixture: ComponentFixture<CVotingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVotingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVotingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
