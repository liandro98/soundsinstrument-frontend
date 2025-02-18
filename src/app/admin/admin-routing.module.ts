import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//import { LayoutcltPageComponent } from "./pages/layoutclt-page/layoutclt-page.component";
//import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ProductoComponent } from "./components/producto/producto.component";
import { AdministradorProductosComponent } from "./pages/administrador-productos/administrador-productos.component";
import { BusquedaComponent } from "./components/busqueda/busqueda.component";
import { LayoutAdmPagesComponent } from "./pages/layout-adm-pages/layout-adm-pages.component";
import { HistorialComprasComponent } from "../ventas/pages/historial-compras/historial-compras.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutAdmPagesComponent,
        children: [
            { path:'busqueda', component:AdministradorProductosComponent },
            { path: 'nuevo', component: ProductoComponent  },
            { path: 'edit/:id', component: ProductoComponent  },
            { path: 'historial-ventas', component: HistorialComprasComponent
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