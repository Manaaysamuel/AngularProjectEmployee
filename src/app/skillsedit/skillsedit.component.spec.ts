import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillseditComponent } from './skillsedit.component';

describe('SkillseditComponent', () => {
  let component: SkillseditComponent;
  let fixture: ComponentFixture<SkillseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
