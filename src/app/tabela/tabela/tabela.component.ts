// Importações principais do Angular e PrimeNG usadas neste componente
import { Component, OnInit } from '@angular/core'; // Component para declarar o componente; OnInit para lógica ao iniciar
import { CommonModule } from '@angular/common'; // Módulo com diretivas/pipes básicos (ngIf, ngFor, etc.)
import { Router } from '@angular/router'; // Serviço de roteamento para navegação
import { CardModule } from 'primeng/card'; // Módulo de cartão do PrimeNG (pode ser utilizado em templates)
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Ferramentas de formulários reativos
import { InputTextModule } from 'primeng/inputtext'; // Campo de texto do PrimeNG
import { DropdownModule } from 'primeng/dropdown'; // Dropdown do PrimeNG
import { CalendarModule } from 'primeng/calendar'; // Calendário do PrimeNG
import { ToastModule } from 'primeng/toast'; // Toast (notificações) do PrimeNG
import { RippleModule } from 'primeng/ripple'; // Efeito de ripple em botões/elementos clicáveis
import { ButtonModule } from 'primeng/button'; // Botões do PrimeNG
import { InputMaskModule } from 'primeng/inputmask'; // Máscara para inputs
import { TableModule } from 'primeng/table'; // Tabela (p-table) do PrimeNG
import { DialogModule } from 'primeng/dialog'; // Diálogo modal (p-dialog) do PrimeNG
import { MessageService } from 'primeng/api'; // Serviço para disparar mensagens no p-toast

// Interface que representa um agendamento salvo/exibido
interface Agendamento {
  nome: string; // Nome completo do paciente
  dataNascimento: string; // Data de nascimento (poderia ser Date, aqui está como string)
  numeroTelefone: string; // Telefone de contato
  bairro: string; // Bairro
  rua: string; // Rua
  numero: string; // Número da residência (armazenado como string, validado como dígitos)
  dia: string; // Dia da consulta (ex.: Segunda-feira)
  hora: string; // Horário da consulta (ex.: 8:00)
}

// Interface usada para popular as opções de horários no dropdown
interface HorarioOption {
  label: string; // Texto exibido ao usuário (ex.: '8:00')
  value: string; // Valor efetivo selecionado
  disabled?: boolean; // Indica se a opção está indisponível (já ocupada)
}

@Component({
  selector: 'app-tabela', // Tag HTML para usar este componente
  standalone: true, // Componente standalone (não precisa ser declarado em um módulo)
  imports: [ // Módulos necessários para o template funcionar
    CommonModule, // Diretivas estruturais e pipes
    TableModule, // p-table
    ButtonModule, // p-button (não usado no HTML atual, mas disponível se necessário)
    DialogModule, // p-dialog (o TS usa 'visible', verifique se há uso no HTML)
    CardModule, // p-card (pode ser usado em outros templates)
    ReactiveFormsModule, // Formulários reativos
    InputTextModule, // p-inputText
    DropdownModule, // p-dropdown
    CalendarModule, // p-calendar
    ToastModule, // p-toast
    RippleModule, // Efeito ripple
    InputMaskModule // p-inputMask
  ],
  providers: [MessageService], // Registra o MessageService para usar com o p-toast
  templateUrl: './tabela.component.html', // Caminho do template HTML
  styleUrls: ['./tabela.component.css'] // Caminho dos estilos específicos
})
export class TabelaComponent implements OnInit {
  agendamentos: Agendamento[] = []; // Lista de agendamentos exibidos na tabela (carregados do localStorage)
  visible: boolean = false; // Controla a visibilidade de um possível diálogo de edição (p-dialog)
  formGroup: FormGroup; // Formulário reativo usado para editar os dados do agendamento
  editIndex: number | null = null; // Índice do agendamento em edição; null quando não está editando

  // Opções de dias disponíveis para agendamento
  dias = [
    { label: 'Segunda-feira', value: 'Segunda-feira' }, // Segunda
    { label: 'Terça-feira', value: 'Terça-feira' }, // Terça
    { label: 'Quarta-feira', value: 'Quarta-feira' }, // Quarta
    { label: 'Quinta-feira', value: 'Quinta-feira' }, // Quinta
    { label: 'Sexta-feira', value: 'Sexta-feira' } // Sexta
  ];

  // Opções de horários padrão (podem ser marcadas como 'disabled' conforme ocupação)
  horarios: HorarioOption[] = [
    { label: '8:00', value: '8:00' }, // 8h
    { label: '9:00', value: '9:00' }, // 9h
    { label: '10:00', value: '10:00' }, // 10h
    { label: '11:00', value: '11:00' }, // 11h
    { label: '14:00', value: '14:00' }, // 14h
    { label: '15:00', value: '15:00' } // 15h
  ];

  constructor(
    private router: Router, // Serviço de navegação entre rotas
    private fb: FormBuilder, // Constrói o formulário reativo de forma mais sucinta
    private messageService: MessageService // Dispara mensagens para o p-toast
  ) {
    // Cria o formulário reativo com campos e validações
    this.formGroup = this.fb.group({
      nome: ['', Validators.required], // Nome é obrigatório
      dataNascimento: ['', Validators.required], // Data de nascimento é obrigatória
      numeroTelefone: ['', Validators.required], // Telefone é obrigatório (pode-se considerar máscara/validação extra)
      bairro: ['', Validators.required], // Bairro obrigatório
      rua: ['', Validators.required], // Rua obrigatória
      numero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Número obrigatório e apenas dígitos
      dia: ['', Validators.required], // Dia da consulta obrigatório
      hora: ['', Validators.required] // Horário da consulta obrigatório
    });
  }

  ngOnInit() {
    const storedAgendamentos = localStorage.getItem('agendamentos'); // Busca agendamentos salvos no navegador
    if (storedAgendamentos) { // Se houver dados salvos
      this.agendamentos = JSON.parse(storedAgendamentos); // Converte de JSON para array de objetos
    }
  
    // Observa mudanças no campo 'dia' para recalcular os horários disponíveis
    this.formGroup.get('dia')?.valueChanges.subscribe(dia => {
      this.updateHorarios(dia); // Atualiza lista de horários quando o dia muda
    });
 
    // Atualiza horários na inicialização com o valor atual do campo 'dia' (pode estar vazio)
    this.updateHorarios(this.formGroup.value.dia);
  }

  showDialog(index: number) {
    this.editIndex = index; // Guarda qual item está sendo editado
    this.formGroup.patchValue(this.agendamentos[index]); // Preenche o formulário com os dados do paciente selecionado
    this.visible = true; // Abre o diálogo de edição (se usado no template)
   
    this.updateHorarios(this.agendamentos[index].dia); // Atualiza horários considerando o dia deste agendamento
  }

  updateHorarios(diaSelecionado: string) {
    // Define a lista base de horários disponíveis (sem considerar ocupações)
    const horariosBase: HorarioOption[] = [
      { label: '8:00', value: '8:00' },
      { label: '9:00', value: '9:00' },
      { label: '10:00', value: '10:00' },
      { label: '11:00', value: '11:00' },
      { label: '14:00', value: '14:00' },
      { label: '15:00', value: '15:00' }
    ];

    if (!diaSelecionado) { // Se ainda não foi selecionado um dia
      this.horarios = horariosBase; // Apenas usa a lista base (sem desabilitar nada)
      return; // Sai da função
    }

    // Cria uma lista com horários já ocupados para o 'diaSelecionado'
    // Se estiver editando um paciente, ignora o próprio índice (para não bloquear o horário dele)
    const ocupados = this.agendamentos
      .filter((a, idx) => a.dia === diaSelecionado && idx !== this.editIndex)
      .map(a => a.hora);

    // Marca como 'disabled' os horários que estão presentes na lista 'ocupados'
    this.horarios = horariosBase.map(h => ({
      ...h, // Mantém label e value
      disabled: ocupados.includes(h.value) // Desabilita se o horário já estiver ocupado
    }));
  }

  onSubmit() {
    if (this.formGroup.valid && this.editIndex !== null) { // Só prossegue se o formulário for válido e existe um item em edição
      const { dia, hora } = this.formGroup.value; // Extrai dia e hora do formulário

      // Verifica se já existe agendamento no mesmo dia e horário (excluindo o próprio em edição)
      const conflito = this.agendamentos.some((a, idx) =>
        idx !== this.editIndex && a.dia === dia && a.hora === hora
      );
      if (conflito) { // Caso exista conflito, exibe erro e interrompe
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Já existe um paciente agendado para este dia e horário!' });
        return; // Não salva
      }

      this.agendamentos[this.editIndex] = this.formGroup.value; // Persiste as alterações no array local
      localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos)); // Atualiza o armazenamento local
      this.visible = false; // Fecha o diálogo (se estiver aberto)
      this.editIndex = null; // Sai do modo de edição
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Paciente atualizado com sucesso!' }); // Feedback de sucesso
    } else{ // Formulário inválido ou sem item selecionado para edição
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha o formulário corretamente!' }); // Mostra erro
      this.formGroup.markAllAsTouched(); // Marca todos os campos como tocados para exibir mensagens de validação
      return; // Sai sem salvar
    }
  }

  removerAgendamento(index: number) {
    this.agendamentos.splice(index, 1); // Remove o agendamento da posição indicada
    localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos)); // Atualiza o armazenamento local
    this.messageService.add({ severity: 'info', summary: 'Removido', detail: 'Paciente removido com sucesso!' }); // Feedback informativo
  }

  voltar() {
    this.router.navigateByUrl('/'); // Navega de volta para a rota raiz (home)
    // Observação: se desejar voltar ao formulário, considere usar this.router.navigate(['/formulario'])
  }
}