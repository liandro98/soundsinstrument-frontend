import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export interface NavigationItem {
  title: string;
  path: string;
  description: string;
  requiresAuth: boolean;
  requiredRole?: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationSearchService {

  private navigationItems: NavigationItem[] = [
    // Secciones públicas
    { 
      title: 'Inicio', 
      path: '/clientes/inicio', 
      description: 'Página principal de SoundsInstrument', 
      requiresAuth: false 
    },
    { 
      title: 'Catálogo', 
      path: '/clientes/instrumentos', 
      description: 'Explora nuestro catálogo de instrumentos musicales', 
      requiresAuth: false 
    },
    { 
      title: 'Nosotros', 
      path: '/nosotros', 
      description: 'Conoce más sobre SoundsInstrument', 
      requiresAuth: false 
    },
    
    // Secciones de autenticación
    { 
      title: 'Iniciar Sesión', 
      path: '/auth/login', 
      description: 'Accede a tu cuenta', 
      requiresAuth: false 
    },
    { 
      title: 'Registro', 
      path: '/auth/registro', 
      description: 'Crea una nueva cuenta', 
      requiresAuth: false 
    },
    { 
      title: 'Recuperar Contraseña', 
      path: '/auth/recuperar-cuenta', 
      description: 'Recupera el acceso a tu cuenta', 
      requiresAuth: false 
    },
    
    // Secciones que requieren autenticación
    { 
      title: 'Perfil', 
      path: '/auth/perfil', 
      description: 'Ver y gestionar tu perfil', 
      requiresAuth: true 
    },
    { 
      title: 'Editar Perfil', 
      path: '/auth/edit-perfil', 
      description: 'Actualiza tu información personal', 
      requiresAuth: true 
    },
    { 
      title: 'Carrito de Compras', 
      path: '/ventas/cart', 
      description: 'Ver productos en tu carrito', 
      requiresAuth: true,
      requiredRole: ['Cliente', 'ADMTlN']
    },
    
    // Secciones de administración
    { 
      title: 'Administrar Productos', 
      path: '/administracion/busqueda', 
      description: 'Gestionar el inventario de productos', 
      requiresAuth: true, 
      requiredRole: 'ADMTlN' 
    },
    { 
      title: 'Nuevo Producto', 
      path: '/administracion/nuevo', 
      description: 'Añadir un nuevo producto al catálogo', 
      requiresAuth: true, 
      requiredRole: 'ADMTlN' 
    },
    { 
      title: 'Historial de Ventas', 
      path: '/administracion/historial-ventas', 
      description: 'Ver el historial de ventas realizadas', 
      requiresAuth: true, 
      requiredRole: 'ADMTlN' 
    }
  ];

  constructor(private authService: AuthService) { }

  /**
   * Busca secciones que coincidan con el término de búsqueda
   * @param searchTerm Término de búsqueda
   * @returns Array de elementos de navegación que coinciden con la búsqueda
   */
  searchSections(searchTerm: string): NavigationItem[] {
    if (!searchTerm) return [];
    
    searchTerm = searchTerm.toLowerCase().trim();
    
    // Obtener información del usuario actual
    const isAuthenticated = this.authService.isLoggedIn();
    const userRole = this.authService.getCurrentUserRole();
    
    // Filtrar secciones según el término de búsqueda y permisos del usuario
    return this.navigationItems.filter(item => {
      // Verificar si el término de búsqueda coincide con el título o descripción
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm);
      
      // Verificar permisos
      const hasPermission = this.checkPermission(item, isAuthenticated, userRole);
      
      return matchesSearch && hasPermission;
    });
  }

  /**
   * Verifica si el usuario tiene permiso para acceder a una sección
   */
  private checkPermission(
    item: NavigationItem, 
    isAuthenticated: boolean, 
    userRole: string | null
  ): boolean {
    // Si la sección no requiere autenticación, cualquiera puede acceder
    if (!item.requiresAuth) return true;
    
    // Si requiere autenticación pero el usuario no está autenticado
    if (item.requiresAuth && !isAuthenticated) return false;
    
    // Si requiere un rol específico
    if (item.requiredRole) {
      if (!userRole) return false;
      
      if (Array.isArray(item.requiredRole)) {
        return item.requiredRole.includes(userRole);
      } else {
        return item.requiredRole === userRole;
      }
    }
    
    // Si solo requiere autenticación (sin rol específico)
    return true;
  }
}
