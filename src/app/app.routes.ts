import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { TabelaComponent } from './tabela/tabela/tabela.component';
import { LoginComponent } from './login/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { MedicamentosComponent } from './medicamentos/medicamentos/medicamentos.component';
export const routes: Routes = [
    { path: '', redirectTo: 'formulario', pathMatch: 'full' },
    { path: 'formulario', component: FormularioComponent },
    { path: 'tabela', component: TabelaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'medicamentos', component: MedicamentosComponent },
];
export class AppRoutesModule { }