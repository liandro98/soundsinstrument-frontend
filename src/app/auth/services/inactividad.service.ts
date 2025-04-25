import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InactividadService {
  private timeoutId: any;
  private readonly INACTIVIDAD_MIN_MS = 60 * 1000; // 1 minuto

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  iniciar() {
    this.resetTimer();

    document.addEventListener('mousemove', () => this.resetTimer());
    document.addEventListener('keydown', () => this.resetTimer());
    document.addEventListener('click', () => this.resetTimer());
    document.addEventListener('scroll', () => this.resetTimer());
  }

  private resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.authService.logOut(); // limpia storage y token
        this.router.navigate(['/auth/login']);
      });
    }, this.INACTIVIDAD_MIN_MS);
  }
}
