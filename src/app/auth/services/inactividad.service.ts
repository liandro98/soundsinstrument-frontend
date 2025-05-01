import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiryDialogComponent } from '../components/session-expiry-dialog/session-expiry-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class InactividadService {
  private timeoutId: any;
  private readonly INACTIVIDAD_MIN_MS = 60 * 1000; // 1 minuto
  private readonly WARNING_BEFORE_LOGOUT_MS = 10 * 1000; // 10 segundos de advertencia antes de cerrar sesión

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private dialog: MatDialog
  ) {}

  iniciar() {
    // Solo iniciar el servicio si hay un token (usuario autenticado)
    if (sessionStorage.getItem('tkn')) {
      this.resetTimer();

      document.addEventListener('mousemove', () => this.resetTimer());
      document.addEventListener('keydown', () => this.resetTimer());
      document.addEventListener('click', () => this.resetTimer());
      document.addEventListener('scroll', () => this.resetTimer());
    }
  }

  private resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.showSessionExpiryDialog();
      });
    }, this.INACTIVIDAD_MIN_MS - this.WARNING_BEFORE_LOGOUT_MS);
  }

  private showSessionExpiryDialog() {
    // Solo mostrar el diálogo si el usuario sigue autenticado
    if (sessionStorage.getItem('tkn')) {
      const dialogRef = this.dialog.open(SessionExpiryDialogComponent, {
        width: '350px',
        disableClose: true, // Evita que el usuario cierre el diálogo haciendo clic fuera de él
        data: { countdown: this.WARNING_BEFORE_LOGOUT_MS / 1000 }
      });

      dialogRef.afterClosed().subscribe(continueSession => {
        if (continueSession) {
          // El usuario quiere continuar la sesión
          this.resetTimer();
        } else {
          // El usuario quiere cerrar sesión
          this.ngZone.run(() => {
            this.authService.logOut(); // limpia storage y token
            this.router.navigate(['/auth/login']);
          });
        }
      });

      // Configurar un temporizador para cerrar la sesión automáticamente si el usuario no responde
      const autoLogoutTimeout = setTimeout(() => {
        dialogRef.close(false); // Cierra el diálogo y cierra la sesión
      }, this.WARNING_BEFORE_LOGOUT_MS);

      // Limpiar el temporizador si el usuario responde
      dialogRef.afterOpened().subscribe(() => {
        dialogRef.backdropClick().subscribe(() => {
          clearTimeout(autoLogoutTimeout);
        });
      });
    }
  }
}
