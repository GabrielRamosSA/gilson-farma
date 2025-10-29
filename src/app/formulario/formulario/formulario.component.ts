import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'; // Importo itens do Angular; ChangeDetectionStrategy está importado mas não é usado neste arquivo.
import { Router } from '@angular/router'; // Router permite navegar entre rotas programaticamente.
import { CardModule } from 'primeng/card'; // Módulo do cartão (PrimeNG) usado no template para layout.
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Ferramentas do Angular Forms para formulário reativo.
import { InputTextModule } from 'primeng/inputtext'; // Módulo para inputs de texto do PrimeNG.
import { DropdownModule } from 'primeng/dropdown'; // Módulo para dropdowns do PrimeNG.
import { CalendarModule } from 'primeng/calendar'; // Módulo de calendário (se necessário em outros pontos).
import { PrimeNGConfig } from 'primeng/api'; // Configurações globais do PrimeNG (ex.: traduções).
import { ToastModule } from 'primeng/toast'; // Módulo do componente de mensagens/toast.
import { MessageService } from 'primeng/api'; // Serviço para disparar toasts (sucesso, erro, etc.).
import { RippleModule } from 'primeng/ripple'; // Efeito ripple nos botões e interações.
import { ButtonModule } from 'primeng/button'; // Botões do PrimeNG.
import { InputMaskModule } from 'primeng/inputmask'; // Componente de máscara para inputs (telefone, data...).

interface Horarios { // Interface que tipa cada opção de horário.
  hora: string; // Texto do horário exibido e usado como valor.
  disabled?: boolean; // Flag para desativar horários já ocupados.
}

interface Dias { // Interface que tipa cada opção de dia.
  dia: string; // Nome do dia (ex.: Segunda-feira).
}

@Component({ // Decorator que transforma a classe abaixo em um componente Angular.
  selector: 'app-formulario', // Nome da tag HTML que representa este componente.
  standalone: true, // Marca o componente como standalone (não precisa estar em um NgModule).
  imports: [ // Lista de módulos/componentes utilizados diretamente no template.
    CardModule, ReactiveFormsModule, InputTextModule, DropdownModule,
    CalendarModule, ToastModule, RippleModule, ButtonModule, InputMaskModule
  ],
  providers: [MessageService], // Disponibiliza o MessageService para este componente.
  templateUrl: './formulario.component.html', // Caminho do arquivo de template HTML.
  styleUrls: ['./formulario.component.css'] // Caminho do(s) arquivo(s) de estilo CSS.
})
export class FormularioComponent implements OnInit { // Classe do componente; implementa OnInit para rodar lógica ao iniciar.
  horarios: Horarios[] = []; // Lista de horários disponíveis (será usada no dropdown).
  dias: Dias[] = []; // Lista de dias disponíveis (será usada no dropdown).
  formGroup: FormGroup; // Estrutura reativa que representa o formulário e suas validações.
  constructor(private messageService: MessageService, private router: Router, private primengConfig: PrimeNGConfig) { // Injeta serviços necessários.
    this.formGroup = new FormGroup({ // Crio o FormGroup com todos os controles do formulário.
      selecionarHorarios: new FormControl<Horarios | null>(null, Validators.required), // Dropdown de horários (obrigatório).
      selecionarDias: new FormControl<Dias | null>(null, Validators.required), // Dropdown de dias (obrigatório).
      nome: new FormControl<string | null>(null, Validators.required), // Campo de nome (obrigatório).
      dataNascimento: new FormControl<string | null>(null, Validators.required), // Campo de data de nascimento (obrigatório, texto com máscara).
      numeroTelefone: new FormControl<string | null>(null, Validators.required), // Campo de telefone com máscara (obrigatório).
      bairro : new FormControl<string | null>(null, Validators.required), // Bairro (obrigatório).
      rua : new FormControl<string | null>(null, Validators.required), // Rua (obrigatório).
      numero : new FormControl<number | null>(null, Validators.required), // Número da casa (obrigatório, numérico).
    }); // Fim da definição do FormGroup.
  } // Fim do construtor.
  ngOnInit() { // Ciclo de vida chamado quando o componente é inicializado.

    this.primengConfig.setTranslation({ // Ajusto traduções globais do PrimeNG para PT-BR.
      accept: 'Sim', // Texto padrão para aceitar.
      reject: 'Não', // Texto padrão para rejeitar.
      dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'], // Nomes completos dos dias.
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'], // Abreviações dos dias.
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'], // Versões mínimas (uma letra) dos dias.
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'], // Nomes dos meses.
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], // Abreviações dos meses.
      today: 'Hoje', // Texto do botão "Hoje".
      clear: 'Limpar', // Texto do botão "Limpar".
      dateFormat: 'dd/mm/aaaa', // Formato de data exibido (nota: alguns componentes usam dd/mm/yy por padrão).
      weekHeader: 'Sm' // Cabeçalho da semana.
    }); // Fim da configuração de tradução.

    this.horarios = [ // Defino a lista de horários disponíveis.
      { hora: '8:00' }, // 8h.
      { hora: '9:00' }, // 9h.
      { hora: '10:00' }, // 10h.
      { hora: '11:00' }, // 11h.
      { hora: '13:00' }, // 13h.
      { hora: '14:00' }, // 14h.
      { hora: '15:00' }, // 15h.
      { hora: '16:00' }, // 16h.
      { hora: '17:00' } // 17h.
    ]; // Fim da lista de horários.

    this.dias = [ // Defino a lista de dias úteis disponíveis para consulta.
      { dia: 'Segunda-feira' }, // Segunda.
      { dia: 'Terça-feira' }, // Terça.
      { dia: 'Quarta-feira' }, // Quarta.
      { dia: 'Quinta-feira' }, // Quinta.
      { dia: 'Sexta-feira' }, // Sexta.
    ]; // Fim da lista de dias.

    this.formGroup.get('selecionarDias')?.valueChanges.subscribe(dia => { // Quando o usuário muda o dia, atualizo os horários disponíveis.
      this.updateHorarios(dia); // Chamo a função para marcar horários já ocupados para esse dia.
    }); // Fim da inscrição no valueChanges.
  } // Fim do ngOnInit.


  updateHorarios(dia: Dias | null) { // Marca horários como desabilitados com base nos agendamentos já salvos.
    if (!dia) return; // Se não há dia selecionado, não há o que atualizar.

    const storedAgendamentos = localStorage.getItem('agendamentos'); // Busco agendamentos armazenados no localStorage.
    if (storedAgendamentos) { // Se existe algo salvo...
      const agendamentos = JSON.parse(storedAgendamentos) as any[]; // Converto de string para array de objetos.
      const horariosOcupados = agendamentos // Calculo quais horários já estão ocupados para o dia selecionado.
        .filter(a => a.dia === dia.dia) // Filtro agendamentos do mesmo dia.
        .map(a => a.hora); // Extraio apenas a hora de cada agendamento.

      this.horarios.forEach(horario => { // Percorro a lista de horários disponíveis.
        horario.disabled = horariosOcupados.includes(horario.hora); // Desativo os que já estão ocupados.
      }); // Fim do forEach.
    } // Fim do if de storedAgendamentos.
  } // Fim de updateHorarios.

  onSubmit() { // Disparado quando o formulário é enviado.
    if (this.formGroup.valid) { // Apenas segue se o formulário estiver válido.
      const agendamento = { // Estruturo o objeto de agendamento com os dados do formulário.
        nome: this.formGroup.value.nome, // Nome do paciente.
        dataNascimento: this.formGroup.value.dataNascimento, // Data de nascimento.
        numeroTelefone: this.formGroup.value.numeroTelefone, // Telefone de contato.
        bairro: this.formGroup.value.bairro, // Bairro do endereço.
        rua: this.formGroup.value.rua, // Rua do endereço.
        numero: this.formGroup.value.numero, // Número da casa.
        dia: this.formGroup.value.selecionarDias?.dia, // Dia escolhido.
        hora: this.formGroup.value.selecionarHorarios?.hora, // Hora escolhida.
      }; // Fim do objeto agendamento.

      let agendamentos = []; // Começo com um array vazio de agendamentos.
      const storedAgendamentos = localStorage.getItem('agendamentos'); // Tento recuperar o que já está salvo.
      if (storedAgendamentos) { // Se houver dados...
        agendamentos = JSON.parse(storedAgendamentos); // Converto para array.
      } // Fim do if de storedAgendamentos.
      agendamentos.push(agendamento); // Adiciono o novo agendamento à lista.
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos)); // Persiste a lista atualizada no localStorage.

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Você foi cadastrado!!' }); // Mostro mensagem de sucesso.
      this.formGroup.reset(); // Limpo o formulário para um novo preenchimento.
      this.updateHorarios(this.formGroup.value.selecionarDias);  // Atualizo os horários com base na seleção atual (após reset pode estar nulo).
    } else{ // Caso o formulário não esteja válido...
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha o formulario corretamente' }); // Mostro mensagem de erro ao usuário.

    } // Fim do else.
  } // Fim do onSubmit.

  formatDate(dateString: string): string { // Utilitário para converter datas de dd/mm/aaaa para aaaa-mm-dd.
    const dateParts = dateString.split('/'); // Separo a string de data pelo caractere '/'.
    if (dateParts.length === 3) { // Verifico se veio dia, mês e ano.
      return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Reorganizo para o formato ISO simples.
    } // Fim do if.
    return dateString; // Se não estiver no formato esperado, devolvo como veio.
  } // Fim de formatDate.

  tabela() { // Navega para a tela com a tabela de consultas.
    this.router.navigateByUrl('/tabela'); // Usa o Router para trocar a rota.
  } // Fim de tabela.
   login() { // Navega para a tela de login.
    this.router.navigateByUrl('/login'); // Troca a rota para /login.
  } // Fim de login.
  medicamentos() { // Navega para a tela de medicamentos.
    this.router.navigateByUrl('/medicamentos'); // Observação: no template HTML consta routerLink="/medicamento" (singular); ideal alinhar para o mesmo path.
  } // Fim de medicamentos.
  limparDados() { // Remove todos os agendamentos salvos e avisa o usuário.
    localStorage.removeItem('agendamentos'); // Apaga a chave do localStorage.
    this.messageService.add({ severity: 'warn', summary: 'Dados Limpos', detail: 'Todos os dados foram apagados!' }); // Exibe aviso de dados limpos.
    this.updateHorarios(this.formGroup.value.selecionarDias);  // Recalcula horários após a limpeza.
  } // Fim de limparDados.

} // Fim da classe FormularioComponent.
