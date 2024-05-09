import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrpagePage } from './qrpage.page';

describe('QrpagePage', () => {
  let component: QrpagePage;
  let fixture: ComponentFixture<QrpagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
