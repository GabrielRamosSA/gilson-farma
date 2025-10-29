// Ponto de entrada da aplicação Angular (standalone). Aqui fazemos o bootstrap (inicialização).
import { bootstrapApplication } from '@angular/platform-browser'; // Função que inicia o app sem precisar de NgModule
import { appConfig } from './app/app.config'; // Configurações globais do app (rotas, animações, toast etc.)
import { AppComponent } from './app/app.component'; // Componente raiz que será renderizado dentro de <app-root>

// Executa o bootstrap do AppComponent aplicando as configurações definidas em app.config.ts
bootstrapApplication(AppComponent, appConfig)
  // Caso algo dê errado durante a inicialização, registramos o erro no console para facilitar o debug
  .catch((err) => console.error(err));
