import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaProductComponent } from './modifica-product.component';

describe('ModificaProductComponent', () => {
  let component: ModificaProductComponent;
  let fixture: ComponentFixture<ModificaProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
