import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCredentialsDialogComponent } from './update-credentials-dialog.component';

describe('UpdateCredentialsDialogComponent', () => {
  let component: UpdateCredentialsDialogComponent;
  let fixture: ComponentFixture<UpdateCredentialsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCredentialsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCredentialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
