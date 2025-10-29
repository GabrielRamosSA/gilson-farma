// Importações necessárias para compor o componente de Admin e seus recursos de UI
import { Component, OnInit } from '@angular/core'; // Component para declarar e OnInit para lógica de inicialização
import { CommonModule } from '@angular/common'; // Diretivas/pipes básicos (ngIf, ngFor)
import { Router } from '@angular/router'; // Navegação entre rotas
import { CardModule } from 'primeng/card'; // Cartões do PrimeNG (opcional no template atual)
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Formulários reativos e validações
import { InputTextModule } from 'primeng/inputtext'; // pInputText
import { DropdownModule } from 'primeng/dropdown'; // p-dropdown
import { CalendarModule } from 'primeng/calendar'; // p-calendar (não aparece no HTML atual, mas disponível)
import { ToastModule } from 'primeng/toast'; // p-toast (notificações)
import { RippleModule } from 'primeng/ripple'; // Efeito visual de clique
import { ButtonModule } from 'primeng/button'; // p-button
import { InputMaskModule } from 'primeng/inputmask'; // p-inputMask para máscaras
import { TableModule } from 'primeng/table'; // p-table para a tabela de agendamentos
import { DialogModule } from 'primeng/dialog'; // p-dialog para edição em modal
import { MessageService } from 'primeng/api'; // Serviço para disparar mensagens/toasts

// Interface que representa o modelo de um agendamento
interface Agendamento {
  nome: string; // Nome completo do paciente
  dataNascimento: string; // Data de nascimento (pode ser string ou Date dependendo do uso)
  numeroTelefone: string; // Telefone de contato
  bairro: string; // Bairro
  rua: string; // Rua
  numero: string; // Número da casa (validado como dígitos pelo pattern)
  dia: string; // Dia da consulta
  hora: string; // Horário da consulta
}

// Interface usada para popular opções do dropdown de horários
interface HorarioOption {
  label: string; // Texto exibido (ex.: '8:00')
  value: string; // Valor correspondente
  disabled?: boolean; // Indica se a opção está indisponível (já ocupada)
}

@Component({
  selector: 'app-tabela', // OBS: provável resquício de cópia; para Admin, costuma-se usar 'app-admin'
  standalone: true, // Componente standalone (não precisa ser declarado em módulo)
  imports: [ // Módulos usados pelo template HTML deste componente
    CommonModule, // Diretivas estruturais/pipes
    TableModule, // p-table
    ButtonModule, // p-button
    DialogModule, // p-dialog
    CardModule, // p-card (opcional)
    ReactiveFormsModule, // Formulários reativos
    InputTextModule, // pInputText
    DropdownModule, // p-dropdown
    CalendarModule, // p-calendar (opcional)
    ToastModule, // p-toast
    RippleModule, // Efeito ripple
    InputMaskModule // p-inputMask
  ],
  providers: [MessageService], // Disponibiliza o serviço de mensagens para toasts
  templateUrl: './admin.component.html', // Template vinculado a este componente
  styleUrls: ['./admin.component.css'] // Estilos específicos da página de admin
})
export class AdminComponent implements OnInit {
  agendamentos: Agendamento[] = []; // Lista dos agendamentos carregados do localStorage
  visible: boolean = false; // Controla a exibição do modal (p-dialog) de edição
  formGroup: FormGroup; // Formulário reativo para editar um agendamento
  editIndex: number | null = null; // Índice do item sendo editado; null se nenhum

  // Lista de dias disponíveis para agendamento
  dias = [
    { label: 'Segunda-feira', value: 'Segunda-feira' }, // Segunda
    { label: 'Terça-feira', value: 'Terça-feira' }, // Terça
    { label: 'Quarta-feira', value: 'Quarta-feira' }, // Quarta
    { label: 'Quinta-feira', value: 'Quinta-feira' }, // Quinta
    { label: 'Sexta-feira', value: 'Sexta-feira' } // Sexta
  ];

  // Horários padrão; podem ser desabilitados conforme ocupação para o dia escolhido
  horarios: HorarioOption[] = [
    { label: '8:00', value: '8:00' }, // 8h
    { label: '9:00', value: '9:00' }, // 9h
    { label: '10:00', value: '10:00' }, // 10h
    { label: '11:00', value: '11:00' }, // 11h
    { label: '14:00', value: '14:00' }, // 14h
    { label: '15:00', value: '15:00' } // 15h
  ];

  constructor(
    private router: Router, // Serviço de navegação
    private fb: FormBuilder, // Construtor do formulário reativo
    private messageService: MessageService // Serviço para exibir toasts
  ) {
    // Define os campos do formulário e suas validações
    this.formGroup = this.fb.group({
      nome: ['', Validators.required], // Nome obrigatório
      dataNascimento: ['', Validators.required], // Data de nascimento obrigatória
      numeroTelefone: ['', Validators.required], // Telefone obrigatório (há máscara no HTML)
      bairro: ['', Validators.required], // Bairro obrigatório
      rua: ['', Validators.required], // Rua obrigatória
      numero: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Número obrigatório e apenas dígitos
      dia: ['', Validators.required], // Dia obrigatório
      hora: ['', Validators.required] // Horário obrigatório
    });
  }

  ngOnInit() {
    const storedAgendamentos = localStorage.getItem('agendamentos'); // Lê agendamentos do armazenamento local
    if (storedAgendamentos) { // Se houver dados salvos
      this.agendamentos = JSON.parse(storedAgendamentos); // Converte JSON para objetos
    }
 
    // Recalcula os horários sempre que o campo 'dia' for alterado no formulário
    this.formGroup.get('dia')?.valueChanges.subscribe(dia => {
      this.updateHorarios(dia);
    });

    // Atualiza horários na inicialização de acordo com o dia atual do form (pode estar vazio)
    this.updateHorarios(this.formGroup.value.dia);
  }

  showDialog(index: number) {
    this.editIndex = index; // Marca qual agendamento será editado
    this.formGroup.patchValue(this.agendamentos[index]); // Preenche o formulário com os dados selecionados
    this.visible = true; // Abre o modal de edição
 
    this.updateHorarios(this.agendamentos[index].dia); // Atualiza horários considerando o dia do agendamento
  }

  updateHorarios(diaSelecionado: string) {
    // Lista base de horários disponíveis (antes de aplicar ocupação)
    const horariosBase: HorarioOption[] = [
      { label: '8:00', value: '8:00' },
      { label: '9:00', value: '9:00' },
      { label: '10:00', value: '10:00' },
      { label: '11:00', value: '11:00' },
      { label: '14:00', value: '14:00' },
      { label: '15:00', value: '15:00' }
    ];

    if (!diaSelecionado) { // Se nenhum dia foi selecionado
      this.horarios = horariosBase; // Usa a lista base sem desabilitar
      return; // Sai da função
    }

    // Horários ocupados para o dia selecionado, ignorando o item que está sendo editado
    const ocupados = this.agendamentos
      .filter((a, idx) => a.dia === diaSelecionado && idx !== this.editIndex)
      .map(a => a.hora);

    // Aplica 'disabled' às opções que constam como ocupadas
    this.horarios = horariosBase.map(h => ({
      ...h,
      disabled: ocupados.includes(h.value)
    }));
  }

  onSubmit() {
    if (this.formGroup.valid && this.editIndex !== null) { // Confere se o formulário é válido e há item em edição
      const { dia, hora } = this.formGroup.value; // Extrai dia e hora do form
  
      // Verifica conflito com outros agendamentos no mesmo dia e horário
      const conflito = this.agendamentos.some((a, idx) =>
        idx !== this.editIndex && a.dia === dia && a.hora === hora
      );
      if (conflito) { // Em caso de conflito, mostra erro e aborta a atualização
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Já existe um paciente agendado para este dia e horário!' });
        return;
      }

      this.agendamentos[this.editIndex] = this.formGroup.value; // Salva alterações no array
      localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos)); // Persiste no localStorage
      this.visible = false; // Fecha o modal
      this.editIndex = null; // Sai do modo de edição
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Paciente atualizado com sucesso!' }); // Feedback de sucesso
    } else{ // Caso formulário inválido ou sem item selecionado
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha o formulário corretamente!' }); // Exibe mensagem de erro
      this.formGroup.markAllAsTouched(); // Marca campos como tocados para exibir validações
      return; // Interrompe
    }
  }

  removerAgendamento(index: number) {
    this.agendamentos.splice(index, 1); // Remove o agendamento pelo índice
    localStorage.setItem('agendamentos', JSON.stringify(this.agendamentos)); // Atualiza armazenamento
    this.messageService.add({ severity: 'info', summary: 'Removido', detail: 'Paciente removido com sucesso!' }); // Mensagem informativa
  }

  voltar() {
    this.router.navigateByUrl('/'); // Navega para a rota raiz (home)
    // Dica: se preferir voltar ao formulário, use this.router.navigate(['/formulario'])
  }
}