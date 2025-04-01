import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetriveActivesessioComponent } from './retrive-activesessio.component';

describe('RetriveActivesessioComponent', () => {
  let component: RetriveActivesessioComponent;
  let fixture: ComponentFixture<RetriveActivesessioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetriveActivesessioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetriveActivesessioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
