import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductoComponent } from "./components/producto/producto.component";
import { AdministradorProductosComponent } from "./pages/administrador-productos/administrador-productos.component";
import { LayoutAdmPagesComponent } from "./pages/layout-adm-pages/layout-adm-pages.component";
import { HistorialComprasComponent } from "../ventas/pages/historial-compras/historial-compras.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutAdmPagesComponent,
        children: [
            { path:'busqueda', component:AdministradorProductosComponent, data: { breadcrumb: 'Gestionar Productos' } },
            { path: 'nuevo', component: ProductoComponent, data: { breadcrumb: 'Nuevo producto' }  },
            { path: 'edit/:id', component: ProductoComponent, data: { breadcrumb: 'Editar' }  },
            { path: 'historial-ventas', component: HistorialComprasComponent, data: { breadcrumb: 'Historial' }
            },
            { path:'**', redirectTo:'busqueda'  }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AdminRoutingModule {
    
}