import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-reference-sheet',
  standalone: true,
  imports: [
    MatTabsModule,
    MatIcon,
  ],
  templateUrl: './reference-sheet.component.html',
  styleUrl: './reference-sheet.component.scss'
})
export class ReferenceSheetComponent {
  public readonly fontSet = 'material-icons-outlined';
}
