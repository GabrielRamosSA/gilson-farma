// Arquivo de configuração principal do aplicativo Angular (standalone)
import { ApplicationConfig } from '@angular/core'; // Tipo que descreve a configuração da aplicação
import { provideAnimations } from '@angular/platform-browser/animations'; // Habilita animações (necessário para vários componentes, como Toastr)
import { provideToastr } from 'ngx-toastr'; // Fornece o serviço de Toastr com configurações globais
import { provideRouter } from '@angular/router'; // Fornece o roteador com as rotas da aplicação
import { routes } from './app.routes'; // Importa a lista de rotas definidas no projeto

// Exporta a configuração da aplicação com todos os providers necessários
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Registra o roteador usando as rotas do app
    provideAnimations(), // Ativa animações do Angular (recomendado para UX e para Toastr)
    provideToastr({ // Configurações padrão para os toasts em toda a aplicação
      timeOut: 3000, // Tempo de exibição de cada toast (3 segundos)
      positionClass: 'toast-top-right', // Posiciona os toasts no canto superior direito
      preventDuplicates: true, // Evita mostrar toasts duplicados seguidos
      progressBar: true, // Mostra uma barra de progresso no toast
      closeButton: true, // Exibe botão de fechar no toast
      enableHtml: true // Permite HTML dentro do conteúdo do toast (usar com cautela)
    })
  ]
};
