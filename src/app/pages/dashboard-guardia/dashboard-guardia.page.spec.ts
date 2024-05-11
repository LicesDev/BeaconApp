import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardGuardiaPage } from './dashboard-guardia.page';

describe('DashboardGuardiasPage', () => {
  let component: DashboardGuardiaPage;
  let fixture: ComponentFixture<DashboardGuardiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardGuardiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
