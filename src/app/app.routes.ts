import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'detalhes', component: DetalhesComponent }
];
