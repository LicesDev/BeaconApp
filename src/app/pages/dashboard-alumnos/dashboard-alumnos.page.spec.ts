import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAlumnosPage } from './dashboard-alumnos.page';

describe('DashboardAlumnosPage', () => {
  let component: DashboardAlumnosPage;
  let fixture: ComponentFixture<DashboardAlumnosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
