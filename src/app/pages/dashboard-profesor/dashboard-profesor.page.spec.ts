import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardProfesorPage } from './dashboard-profesor.page';

describe('DashboardProfesorPage', () => {
  let component: DashboardProfesorPage;
  let fixture: ComponentFixture<DashboardProfesorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
