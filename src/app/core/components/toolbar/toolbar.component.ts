import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { CarrelloService } from '../../services/carrello.service';
import { DataStorageService } from '../../services/data-storage.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Output() sidenavToggle = new EventEmitter<void>();
}
