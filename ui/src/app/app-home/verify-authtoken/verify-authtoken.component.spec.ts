import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAuthtokenComponent } from './verify-authtoken.component';

describe('VerifyAuthtokenComponent', () => {
  let component: VerifyAuthtokenComponent;
  let fixture: ComponentFixture<VerifyAuthtokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyAuthtokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyAuthtokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
