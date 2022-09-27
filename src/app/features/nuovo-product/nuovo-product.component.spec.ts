import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoProductComponent } from './nuovo-product.component';

describe('NuovoProductComponent', () => {
  let component: NuovoProductComponent;
  let fixture: ComponentFixture<NuovoProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovoProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
