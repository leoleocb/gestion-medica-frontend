import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoLayoutComponent } from './medico-layout.component';

describe('MedicoLayout', () => {
  let component: MedicoLayoutComponent;
  let fixture: ComponentFixture<MedicoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
