import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'; // Importo símbolos do Angular; ChangeDetectionStrategy/OnInit estão importados mas não usados aqui.
import { Router } from '@angular/router'; // Permite navegação programática entre rotas.
import { CardModule } from 'primeng/card'; // Módulo de cartão do PrimeNG (não aparece no HTML atual, mas está disponível).
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Ferramentas para formulário reativo e validações.
import { InputTextModule } from 'primeng/inputtext'; // Diretiva pInputText para inputs de texto.
import { DropdownModule } from 'primeng/dropdown'; // Módulo de dropdown do PrimeNG (não utilizado no HTML do login).
import { CalendarModule } from 'primeng/calendar'; // Módulo de calendário (não utilizado no HTML do login).
import { ToastModule } from 'primeng/toast'; // Componente de toast (usado no HTML como <p-toast>). 
import { MessageService } from 'primeng/api'; // Serviço para disparar mensagens/alerts do PrimeNG.
import { RippleModule } from 'primeng/ripple'; // Efeito ripple em botões (útil com pButton).
import { ButtonModule } from 'primeng/button'; // Componente de botão do PrimeNG (pButton) usado no HTML.
import { InputMaskModule } from 'primeng/inputmask'; // Máscara de input (não utilizada no HTML do login).
import { CommonModule } from '@angular/common'; // Módulo comum com diretivas básicas (ngIf, ngFor, etc.).

@Component({ // Decorator que indica que esta classe é um componente Angular.
  selector: 'app-login', // Tag HTML para usar este componente no template.
  standalone: true, // Componente standalone: pode ser usado sem declarar em um NgModule.
  imports: [ // Módulos necessários para o template funcionar.
    CommonModule, // Diretivas comuns (ngIf/ngFor) caso sejam necessárias.
    CardModule, ReactiveFormsModule, InputTextModule, DropdownModule, // Formulário reativo e input de texto.
    CalendarModule, ToastModule, RippleModule, ButtonModule, InputMaskModule // Toast e botões; alguns módulos aqui não são usados no HTML atual.
  ],
  providers: [MessageService], // Disponibiliza o serviço de mensagens para este componente.
  templateUrl: './login.component.html', // Caminho do template HTML.
  styleUrls: ['./login.component.css'] // Caminho do arquivo de estilos.
})
export class LoginComponent { // Classe do componente de Login.
  formGroup = new FormGroup({ // Crio o FormGroup que representa o formulário reativo.
    usuario: new FormControl('', Validators.required), // Campo "usuario" obrigatório.
    senha: new FormControl('', Validators.required) // Campo "senha" obrigatório.
  }); // Fim da definição do formGroup.

  constructor( // Construtor para injetar serviços necessários.
    private router: Router, // Router para navegar para outras rotas.
    private messageService: MessageService // Serviço de mensagens do PrimeNG para exibir toasts.
  ) {} // Construtor vazio (sem lógica adicional).

  onSubmit() { // Método chamado quando o formulário é enviado (ngSubmit).
    if (this.formGroup.valid) { // Verifico se todos os campos obrigatórios estão preenchidos.
      if ( // Validação simples: confere se usuário e senha são 'admin'.
        this.formGroup.value.usuario === 'admin' && // Compara o valor do controle 'usuario' com a string 'admin'.
        this.formGroup.value.senha === 'admin' // Compara o valor do controle 'senha' com a string 'admin'.
      ) { // Se ambos conferem...
        this.router.navigate(['/admin']); // Navego para a rota /admin.
      } else { // Caso as credenciais não batam...
        this.messageService.add({ // Mostro um toast de erro para o usuário.
          severity: 'error', // Tipo da mensagem: erro.
          summary: 'Erro', // Título do toast.
          detail: 'Usuário ou senha incorretos!' // Detalhe da mensagem exibida.
        }); // Fim da chamada do toast.
        this.formGroup.reset(); // Limpo os campos do formulário após a tentativa.
      } // Fim do else das credenciais incorretas.
    } else { // Se o formulário não estiver válido...
      this.formGroup.markAllAsTouched(); // Marco todos os campos como "tocados" para exibir mensagens de validação no template.
    } // Fim do else de formulário inválido.
  } // Fim do onSubmit.
} // Fim da classe LoginComponent.
