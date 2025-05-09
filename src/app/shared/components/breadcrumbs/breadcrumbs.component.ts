import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
  root?: boolean; // Nueva propiedad para identificar breadcrumbs raíz
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
    this.loadBreadcrumbs();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateBreadcrumbs();
    });
  }

  private getDefaultBreadcrumbs(): Breadcrumb[] {
    return [{
      label:'Inicio',
      url: '/clientes/inicio',
      root:true
    }]
  }

  private loadBreadcrumbs(): void {
    const stored = sessionStorage.getItem('breadcrumbs');
    this.breadcrumbs = stored ? JSON.parse(stored) : this.getDefaultBreadcrumbs();
    console.log('Breadcrumbs cargados:', this.breadcrumbs);
  }

  private updateBreadcrumbs(): void {
    const currentUrl = this.router.url;
    const newBreadcrumbs = this.buildBreadcrumbs();
    
    // Encontrar si el usuario navegó a un breadcrumb existente
    const existingIndex = this.breadcrumbs.findIndex(b => b.url === currentUrl);
    
    if (existingIndex >= 0) {
      // Si navegó a un breadcrumb anterior, truncar el array
      this.breadcrumbs = this.breadcrumbs.slice(0, existingIndex + 1);
    } else {
      // Si es una nueva navegación, agregar al historial
      this.breadcrumbs = [...this.breadcrumbs, ...newBreadcrumbs];
      
      // Eliminar posibles duplicados (por si acaso)
      this.breadcrumbs = this.breadcrumbs.filter((b, i, self) =>
        i === self.findIndex(item => item.url === b.url)
      );
    }
    
    // Asegurar que siempre empiece con Inicio
    if (!this.breadcrumbs.some(b => b.url === '/clientes/inicio')) {
      this.breadcrumbs = [{
        label: 'Inicio',
        url: '/clientes/inicio'
      }, ...this.breadcrumbs];
    }


    this.saveBreadcrumbs();
  }

  private mergeBreadcrumbs(newBreadcrumbs: Breadcrumb[]): void {
    // Mantener solo los breadcrumbs raíz (opcional)
    const rootBreadcrumbs = this.breadcrumbs.filter(b => b.root);
    
    // Combinar con los nuevos breadcrumbs
    this.breadcrumbs = [...rootBreadcrumbs, ...newBreadcrumbs];
    
    // Eliminar duplicados manteniendo el orden
    this.breadcrumbs = this.breadcrumbs.filter((b, i, self) =>
      i === self.findIndex(item => item.url === b.url)
    );
  }

  private saveBreadcrumbs(): void {
    sessionStorage.setItem('breadcrumbs', JSON.stringify(this.breadcrumbs));
    console.log('Breadcrumbs guardados:', this.breadcrumbs);
  }

  private buildBreadcrumbs(): Breadcrumb[] {
    let breadcrumbs: Breadcrumb[] = [];
    let currentRoute = this.activatedRoute.root;
    let fullUrl = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      
      const routeConfig = currentRoute.routeConfig;
      if (!routeConfig || routeConfig.path === '') continue;

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

      // Construir URL evitando dobles barras
      fullUrl = [fullUrl, resolvedPath].filter(part => part).join('/');

      if (breadcrumb) {
        breadcrumbs.push({
          label: typeof breadcrumb === 'function' 
            ? breadcrumb(currentRoute.snapshot.data) 
            : breadcrumb,
          url: '/' + fullUrl,
          root: breadcrumbs.length === 0 // Marcar como raíz si es el primero
        });
      }
    }

    return breadcrumbs;
  }

}