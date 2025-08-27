import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoNavbarComponent } from './medico-navbar.component';

describe('MedicoNavbar', () => {
  let component: MedicoNavbarComponent;
  let fixture: ComponentFixture<MedicoNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
