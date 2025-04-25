import { Component, OnInit } from '@angular/core';
import { InactividadService } from './auth/services/inactividad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'soundTain_Waves-noSt';

  constructor(private inactividadService: InactividadService) {}

  ngOnInit() {
    this.inactividadService.iniciar(); // activamos el control de inactividad
  }

  toUpp() {
    window.scroll(0, 0);
  }
}
