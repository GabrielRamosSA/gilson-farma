// Arquivo de rotas da aplicação (utilizado por provideRouter em app.config.ts)
import { Routes } from '@angular/router'; // Tipo utilitário para tipar a lista de rotas
// Importa os componentes standalone usados como alvos das rotas
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { TabelaComponent } from './tabela/tabela/tabela.component';
import { LoginComponent } from './login/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { MedicamentosComponent } from './medicamentos/medicamentos/medicamentos.component';

// Lista de rotas disponíveis no app
export const routes: Routes = [
    { path: '', redirectTo: '/formulario', pathMatch: 'full' }, // Rota raiz: redireciona para '/formulario'
    { path: 'formulario', component: FormularioComponent }, // Página do formulário de agendamento
    { path: 'tabela', component: TabelaComponent }, // Tabela de agendamentos (visualização/edição)
    { path: 'login', component: LoginComponent }, // Tela de login (admin)
    { path: 'admin', component: AdminComponent }, // Painel/Admin de agendamentos
    { path: 'medicamentos', component: MedicamentosComponent }, // Catálogo de medicamentos e produtos
    // Observação: no HTML do formulário foi visto um possível uso de '/medicamento' (singular);
    // a rota correta definida aqui é '/medicamentos' (plural). Usar '/medicamento' resultará em 404.
];

// Nota: Em apps standalone, esta classe não é necessária; mantém compatibilidade caso seja referenciada em algum lugar.
export class AppRoutesModule { }