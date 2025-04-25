import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouteConfigLoadEnd, ChildActivationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Escuchar eventos de navegación y carga de rutas
    this.router.events.pipe(
      filter(event => 
        event instanceof NavigationEnd || 
        event instanceof RouteConfigLoadEnd ||
        event instanceof ChildActivationEnd
      ),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateBreadcrumbs();
    });

    // Llamada inicial
    this.updateBreadcrumbs();
  }

  private updateBreadcrumbs(): void {
    const breadcrumbs = this.buildBreadcrumbs();
    console.log('Breadcrumbs actualizados:', breadcrumbs);
    this.breadcrumbs = breadcrumbs;
  }

  private buildBreadcrumbs(): Breadcrumb[] {
    let breadcrumbs: Breadcrumb[] = [];
    let currentRoute = this.activatedRoute.root;
    let url = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      
      const routeConfig = currentRoute.routeConfig;
      if (!routeConfig) continue;

      const path = routeConfig.path || '';
      const breadcrumb = routeConfig.data?.['breadcrumb'];
      
      // Manejar rutas con parámetros
      const routeParams = currentRoute.snapshot.params;
      let resolvedPath = path;
      for (const param in routeParams) {
        if (path.includes(`:${param}`)) {
          resolvedPath = path.replace(`:${param}`, routeParams[param]);
        }
      }

      url += `/${resolvedPath}`;

      if (breadcrumb) {
        breadcrumbs.push({
          label: typeof breadcrumb === 'function' ? breadcrumb(currentRoute.snapshot.data) : breadcrumb,
          url: url
        });
      }
    }

    // Añadir inicio si no está
    if (breadcrumbs.length > 0 && breadcrumbs[0].label !== 'Inicio') {
      breadcrumbs.unshift({ label: 'Inicio', url: '/clientes/inicio' });
    }

    return breadcrumbs;
  }
}