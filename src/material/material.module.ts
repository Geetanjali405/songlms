import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange } from '@angular/material/checkbox';
@NgModule({
  declarations: [],
  imports: [MatFormFieldModule, MatPaginatorModule, MatInputModule],
  exports: [
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class MaterialModule {}
