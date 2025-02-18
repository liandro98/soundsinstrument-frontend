import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroNosotrosComponent } from './hero-nosotros.component';

describe('HeroNosotrosComponent', () => {
  let component: HeroNosotrosComponent;
  let fixture: ComponentFixture<HeroNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroNosotrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
