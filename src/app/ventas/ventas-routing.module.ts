import { NgModule } from "@angular/core";
import { RedirectCommand, RouterModule, Routes } from "@angular/router";
import { CarritoComponent } from "./components/carrito/carrito.component";
import { HistorialComprasComponent } from "./pages/historial-compras/historial-compras.component";

const routes: Routes = [
    {
        path: 'cart',
        component: CarritoComponent
    },
    {
      path: '**',
      redirectTo:'cart'
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class VentasRoutingModule {

}
