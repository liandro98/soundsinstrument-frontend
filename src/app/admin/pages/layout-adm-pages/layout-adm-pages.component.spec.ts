import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdmPagesComponent } from './layout-adm-pages.component';

describe('LayoutAdmPagesComponent', () => {
  let component: LayoutAdmPagesComponent;
  let fixture: ComponentFixture<LayoutAdmPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutAdmPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAdmPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
