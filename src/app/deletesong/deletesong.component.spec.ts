import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesongComponent } from './deletesong.component';

describe('DeletesongComponent', () => {
  let component: DeletesongComponent;
  let fixture: ComponentFixture<DeletesongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletesongComponent]
    });
    fixture = TestBed.createComponent(DeletesongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
