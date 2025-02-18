import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {
  @Input('title') titulo:string = 'Titulo';
  @Input('msg') msg:string = 'Mensaje...';
  @Input('enlace') enlace:string = 'Inicio';
}
