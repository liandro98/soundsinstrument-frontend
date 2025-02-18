import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'soundTain_Waves-noSt';
  toUpp(){
    window.scroll(0,0);
  }
}
