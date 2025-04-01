import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewAuthComponent } from './renew-auth.component';

describe('RenewAuthComponent', () => {
  let component: RenewAuthComponent;
  let fixture: ComponentFixture<RenewAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenewAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
