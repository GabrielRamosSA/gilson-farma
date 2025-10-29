// Importações necessárias para construir o componente e sua funcionalidade
import { Component } from '@angular/core'; // Importa o decorator Component para declarar um componente Angular
import { CommonModule } from '@angular/common'; // Importa diretivas e pipes comuns (ngIf, ngFor) para uso no template
import { FormsModule } from '@angular/forms'; // Importa o módulo de formulários para habilitar o [(ngModel)] no template
import { Router } from '@angular/router'; // Importa o roteador para navegação entre páginas
import { ToastrService } from 'ngx-toastr'; // Importa o serviço de toasts para exibir notificações ao usuário

@Component({
  selector: 'app-medicamentos', // Define a tag HTML que representa este componente
  templateUrl: './medicamentos.component.html', // Aponta para o arquivo de template (HTML) deste componente
  styleUrls: ['./medicamentos.component.css'], // Aponta para o arquivo de estilos (CSS) específico deste componente
  standalone: true, // Indica que este é um componente standalone (dispensa declaração em módulo)
  imports: [CommonModule, FormsModule] // Módulos que este componente precisa (diretivas comuns e ngModel)
})
export class MedicamentosComponent {
  // Estado do carrinho: cada item possui nome e quantidade
  carrinho: { nome: string, quantidade: number }[] = []; // Começa vazio
  
  // Estados de UI e filtros
  modalAberto = false; // Controla a visibilidade do modal do carrinho
  filtroAtivo = 'Todos'; // Filtro de tipo ativo (ex.: Genéricos, Referência, etc.)
  termoPesquisa = ''; // Texto digitado na barra de busca
  categoriaAtiva = 'Todos'; // Categoria ativa (ex.: Medicamentos, Vitaminas, etc.)
  
  // Injeta serviços necessários: Router para navegação e Toastr para notificações
  constructor(private router: Router, private toastr: ToastrService) {}

  // Catálogo de produtos com informações para renderização, filtros e busca
  produtos = [
    // ====== MEDICAMENTOS ======
    {
      nome: "Paracetamol 500mg", // Nome do produto exibido na vitrine
      imagem: "/medicamentos/Paracetamol.png", // Caminho da imagem no diretório público
      descricao: "Analgésico e antitérmico para dores e febres.", // Descrição curta do produto
      preco: "R$ 9,90", // Preço atual exibido
      precoAntigo: "R$ 12,90", // Preço anterior (para mostrar desconto)
      quantidade: 25, // Quantidade disponível em estoque
      promocao: true, // Indica se o produto está em promoção
      desconto: 23, // Percentual de desconto (se estiver em promoção)
      tipo: "Genéricos", // Tipo (para filtro por tipo)
      categoria: "Medicamentos", // Categoria (para filtro por categoria)
      palavrasChave: ["paracetamol", "analgesico", "dor", "febre", "acetaminofeno"] // Palavras para busca
    },
    {
      nome: "Dipirona Sódica 1g", // Nome do produto
      imagem: "/medicamentos/DipironaSodica.png", // Imagem do produto
      descricao: "Analgésico e antipirético para alívio de dor e febre.", // Resumo do uso
      preco: "R$ 7,50", // Preço atual
      precoAntigo: "", // Sem preço antigo (não está com desconto antigo exibido)
      quantidade: 40, // Estoque disponível
      promocao: false, // Não está em promoção
      desconto: 0, // Sem desconto aplicado
      tipo: "Genéricos", // Tipo do produto
      categoria: "Medicamentos", // Categoria principal
      palavrasChave: ["dipirona", "analgesico", "dor", "febre", "metamizol"] // Palavras de busca
    },
    {
      nome: "Ibuprofeno 600mg", // Nome do produto
      imagem: "/medicamentos/Ibuprofeno.png", // Caminho da imagem
      descricao: "Anti-inflamatório, analgésico e antitérmico.", // Benefícios principais
      preco: "R$ 14,90", // Preço atual
      precoAntigo: "R$ 18,90", // Preço anterior
      quantidade: 30, // Quantidade disponível
      promocao: true, // Está em promoção
      desconto: 21, // Percentual de desconto
      tipo: "Referência", // Tipo de produto (marca de referência)
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["ibuprofeno", "anti-inflamatorio", "dor", "inflamacao", "artrite"] // Termos para busca
    },
    {
      nome: "Amoxicilina 500mg", // Nome
      imagem: "/medicamentos/Amoxicilina.png", // Imagem
      descricao: "Antibiótico para infecções bacterianas.", // Indicação
      preco: "R$ 19,90", // Preço atual
      precoAntigo: "", // Sem preço antigo
      quantidade: 20, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Similares", // Tipo do medicamento
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["amoxicilina", "antibiotico", "infeccao", "bacteria", "penicilina"] // Palavras para busca
    },
    {
      nome: "Azitromicina 500mg", // Nome
      imagem: "/medicamentos/Azitromicina.png", // Imagem
      descricao: "Antibiótico de amplo espectro.", // Descrição curta
      preco: "R$ 22,50", // Preço atual
      precoAntigo: "R$ 29,90", // Preço anterior
      quantidade: 15, // Estoque
      promocao: true, // Em promoção
      desconto: 25, // Percentual de desconto
      tipo: "Referência", // Tipo (referência)
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["azitromicina", "antibiotico", "infeccao", "respiratoria", "zitromax"] // Termos de busca
    },
    {
      nome: "Losartana Potássica 50mg", // Nome
      imagem: "/medicamentos/LosartanaPotassica.png", // Imagem
      descricao: "Antihipertensivo para controle da pressão arterial.", // Indicação
      preco: "R$ 18,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 40, // Quantidade disponível
      promocao: false, // Não está em promoção
      desconto: 0, // Sem desconto
      tipo: "Genéricos", // Tipo
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["losartana", "pressao", "hipertensao", "cardiovascular", "coração"] // Palavras chave
    },
    {
      nome: "Omeprazol 20mg", // Nome
      imagem: "/medicamentos/Omeprazol.png", // Imagem
      descricao: "Inibidor de bomba de prótons para problemas gástricos.", // Uso
      preco: "R$ 12,90", // Preço atual
      precoAntigo: "R$ 16,90", // Preço anterior
      quantidade: 35, // Estoque
      promocao: true, // Em promoção
      desconto: 24, // Desconto
      tipo: "Similares", // Tipo
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["omeprazol", "gastrite", "azia", "estomago", "refluxo"] // Termos de busca
    },
    {
      nome: "Cetirizina 10mg", // Nome
      imagem: "/medicamentos/Cetirizina.png", // Imagem
      descricao: "Antialérgico para alívio de sintomas alérgicos.", // Indicação
      preco: "R$ 8,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 22, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Genéricos", // Tipo
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["cetirizina", "alergia", "antialergico", "rinite", "urticaria"] // Palavras para busca
    },
    {
      nome: "Cloridrato de Sertralina 50mg", // Nome
      imagem: "/medicamentos/CloridratodeSertralina.png", // Imagem
      descricao: "Antidepressivo ISRS para tratamento de depressão e ansiedade.", // Uso
      preco: "R$ 29,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 12, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Referência", // Tipo (referência)
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["sertralina", "antidepressivo", "depressao", "ansiedade", "zoloft"] // Palavras de busca
    },
    {
      nome: "Fluoxetina 20mg", // Nome
      imagem: "/medicamentos/Fluoxetina.png", // Imagem
      descricao: "Antidepressivo ISRS para tratamento de depressão, transtorno de ansiedade, bulimia e TOC.", // Indicação
      preco: "R$ 24,90", // Preço
      precoAntigo: "R$ 32,90", // Preço anterior
      quantidade: 18, // Estoque
      promocao: true, // Em promoção
      desconto: 24, // Percentual de desconto
      tipo: "Similares", // Tipo
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["fluoxetina", "antidepressivo", "depressao", "ansiedade", "prozac"] // Termos de busca
    },
    {
      nome: "Metformina 850mg", // Nome
      imagem: "/medicamentos/Metformina.png", // Imagem
      descricao: "Antidiabético oral para controle de diabetes tipo 2.", // Indicação
      preco: "R$ 20,90", // Preço
      precoAntigo: "R$ 26,90", // Preço anterior
      quantidade: 33, // Estoque
      promocao: true, // Em promoção
      desconto: 22, // Desconto
      tipo: "Referência", // Tipo
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["metformina", "diabetes", "glicose", "acucar", "diabetico"] // Palavras-chave
    },
    {
      nome: "Enalapril 10mg", // Nome
      imagem: "/medicamentos/Enalapril.png", // Imagem
      descricao: "Inibidor da ECA para tratamento de hipertensão arterial.", // Indicação
      preco: "R$ 15,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 17, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Similares", // Tipo
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["enalapril", "pressao", "hipertensao", "cardiovascular", "ace"] // Palavras-chave
    },
    {
      nome: "Captopril 25mg", // Nome
      imagem: "/medicamentos/Captopril.png", // Imagem
      descricao: "Inibidor da ECA para tratamento de hipertensão arterial.", // Indicação
      preco: "R$ 13,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 29, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Genéricos", // Tipo
      categoria: "Medicamentos", // Categoria
      palavrasChave: ["captopril", "pressao", "hipertensao", "cardiovascular", "ace"] // Palavras-chave
    },

    // ========== VITAMINAS ==========
    {
      nome: "Vitamina D3 2000UI", // Nome
      imagem: "/vitaminas/VitaminaD3.png", // Imagem
      descricao: "Suplemento vitamínico para fortalecimento ósseo e imunidade.", // Benefícios
      preco: "R$ 35,90", // Preço
      precoAntigo: "R$ 42,90", // Preço anterior
      quantidade: 45, // Estoque
      promocao: true, // Em promoção
      desconto: 16, // Desconto
      tipo: "Suplementos", // Tipo
      categoria: "Vitaminas", // Categoria
      palavrasChave: ["vitamina d", "ossos", "calcio", "imunidade", "suplemento"] // Palavras de busca
    },
    {
      nome: "Complexo B", // Nome
      imagem: "/vitaminas/ComplexoB.png", // Imagem
      descricao: "Complexo de vitaminas do grupo B para energia e sistema nervoso.", // Benefícios
      preco: "R$ 28,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 38, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Suplementos", // Tipo
      categoria: "Vitaminas", // Categoria
      palavrasChave: ["complexo b", "vitamina b", "energia", "nervoso", "metabolismo"] // Palavras de busca
    },
    {
      nome: "Vitamina C 1000mg", // Nome
      imagem: "/vitaminas/VitaminaC.png", // Imagem
      descricao: "Poderoso antioxidante para fortalecimento da imunidade.", // Benefício
      preco: "R$ 24,90", // Preço
      precoAntigo: "R$ 31,90", // Preço anterior
      quantidade: 52, // Estoque
      promocao: true, // Em promoção
      desconto: 22, // Desconto
      tipo: "Suplementos", // Tipo
      categoria: "Vitaminas", // Categoria
      palavrasChave: ["vitamina c", "imunidade", "antioxidante", "gripe", "resfriado"] // Palavras de busca
    },
    {
      nome: "Ômega 3 1000mg", // Nome
      imagem: "/vitaminas/Omega3.png", // Imagem
      descricao: "Suplemento de ácidos graxos essenciais para saúde cardiovascular.", // Benefício
      preco: "R$ 45,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 28, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Suplementos", // Tipo
      categoria: "Vitaminas", // Categoria
      palavrasChave: ["omega 3", "cardiovascular", "coracao", "colesterol", "cerebro"] // Palavras
    },
    {
      nome: "Ferro Quelato", // Nome
      imagem: "/vitaminas/FerroQuelato.png", // Imagem
      descricao: "Suplemento de ferro para tratamento e prevenção de anemia.", // Indicação
      preco: "R$ 32,90", // Preço
      precoAntigo: "R$ 38,90", // Preço anterior
      quantidade: 26, // Estoque
      promocao: true, // Em promoção
      desconto: 15, // Desconto
      tipo: "Suplementos", // Tipo
      categoria: "Vitaminas", // Categoria
      palavrasChave: ["ferro", "anemia", "sangue", "cansaço", "energia"] // Palavras-chave
    },
    {
      nome: "Magnésio Dimalato", // Nome
      imagem: "/vitaminas/MagnesioDimalato.png", // Imagem
      descricao: "Suplemento de magnésio para músculos e sistema nervoso.", // Benefícios
      preco: "R$ 39,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 31, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Suplementos", // Tipo
      categoria: "Vitaminas", // Categoria
      palavrasChave: ["magnesio", "musculos", "caibras", "sono", "relaxante"] // Palavras
    },

    {
      nome: "Vitamina AD Gotas", // Nome
      imagem: "/vitaminas/VitaminaAD.png", // Imagem
      descricao: "Suplemento vitamínico AD para desenvolvimento infantil.", // Indicação
      preco: "R$ 18,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 42, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Suplementos", // Tipo
      categoria: "Vitaminas", // Categoria
      palavrasChave: ["vitamina ad", "gotas", "desenvolvimento", "ossos", "visao"] // Palavras
    },
    // ========== PRODUTOS INFANTIS ==========
    {
      nome: "Paracetamol Infantil Gotas", // Nome
      imagem: "/ProdutosInfantis/ParacetamolInfantil.png", // Imagem
      descricao: "Analgésico e antitérmico infantil em gotas, sabor morango.", // Indicação
      preco: "R$ 12,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 35, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Infantil", // Tipo
      categoria: "Infantil", // Categoria
      palavrasChave: ["paracetamol infantil", "gotas", "febre", "dor", "crianca", "bebe"] // Palavras
    },

    {
      nome: "Polivitamínico Infantil", // Nome
      imagem: "/ProdutosInfantis/PolivitaminicoInfantil.png", // Imagem
      descricao: "Complexo vitamínico completo para crianças, sabor uva.", // Descrição
      preco: "R$ 26,90", // Preço
      precoAntigo: "R$ 32,90", // Preço anterior
      quantidade: 19, // Estoque
      promocao: true, // Em promoção
      desconto: 18, // Percentual de desconto
      tipo: "Infantil", // Tipo
      categoria: "Infantil", // Categoria
      palavrasChave: ["polivitaminico", "vitaminas", "crescimento", "desenvolvimento", "crianca"] // Palavras
    },

    // ========== PRODUTOS DE HIGIENE ==========
    {
      nome: "Sabonete Antisséptico", // Nome
      imagem: "/higiene/SaboneteAntisseptico.png", // Imagem
      descricao: "Sabonete líquido antisséptico para higiene das mãos.", // Descrição
      preco: "R$ 15,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 48, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Higiene", // Tipo
      categoria: "Higiene", // Categoria
      palavrasChave: ["sabonete", "antisseptico", "maos", "limpeza", "bacterias"] // Palavras
    },
    {
      nome: "Álcool em Gel 70%", // Nome
      imagem: "/higiene/AlcoolGel.png", // Imagem
      descricao: "Álcool em gel 70% para higienização das mãos.", // Descrição
      preco: "R$ 12,90", // Preço
      precoAntigo: "R$ 16,90", // Preço anterior
      quantidade: 72, // Estoque
      promocao: true, // Em promoção
      desconto: 24, // Desconto
      tipo: "Higiene", // Tipo
      categoria: "Higiene", // Categoria
      palavrasChave: ["alcool gel", "higienizacao", "maos", "70%", "antisseptico"] // Palavras
    },
    {
      nome: "Lenços Umedecidos", // Nome
      imagem: "/higiene/LencosUmedecidos.png", // Imagem
      descricao: "Lenços umedecidos antibacterianos com 100 unidades.", // Descrição
      preco: "R$ 9,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 35, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Higiene", // Tipo
      categoria: "Higiene", // Categoria
      palavrasChave: ["lencos umedecidos", "antibacteriano", "limpeza", "pratico"] // Palavras
    },
    {
      nome: "Shampoo Anticaspa", // Nome
      imagem: "/higiene/ShampooAnticaspa.png", // Imagem
      descricao: "Shampoo medicinal anticaspa com sulfeto de selênio.", // Descrição
      preco: "R$ 22,90", // Preço
      precoAntigo: "R$ 28,90", // Preço anterior
      quantidade: 24, // Estoque
      promocao: true, // Em promoção
      desconto: 21, // Percentual de desconto
      tipo: "Higiene", // Tipo
      categoria: "Higiene", // Categoria
      palavrasChave: ["shampoo", "anticaspa", "cabelo", "dermatite", "couro cabeludo"] // Palavras
    },
    {
      nome: "Sabonete Íntimo Feminino", // Nome
      imagem: "/higiene/SaboneteIntimo.png", // Imagem
      descricao: "Sabonete líquido para higiene íntima feminina pH balanceado.", // Descrição
      preco: "R$ 18,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 31, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Higiene", // Tipo
      categoria: "Higiene", // Categoria
      palavrasChave: ["sabonete intimo", "feminino", "ph", "higiene", "mulher"] // Palavras
    },

    // ========== COSMÉTICOS ==========
    {
      nome: "Protetor Solar FPS 60", // Nome
      imagem: "/cosmeticos/ProtetorSolar.png", // Imagem
      descricao: "Protetor solar facial FPS 60 com base aquosa.", // Descrição
      preco: "R$ 45,90", // Preço
      precoAntigo: "R$ 55,90", // Preço anterior
      quantidade: 28, // Estoque
      promocao: true, // Em promoção
      desconto: 18, // Desconto
      tipo: "Cosméticos", // Tipo
      categoria: "Cosméticos", // Categoria
      palavrasChave: ["protetor solar", "fps 60", "facial", "sol", "protecao"] // Palavras
    },
    {
      nome: "Hidratante Corporal", // Nome
      imagem: "/cosmeticos/HidratanteCorporal.png", // Imagem
      descricao: "Loção hidratante corporal com ureia para pele seca.", // Descrição
      preco: "R$ 32,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 22, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Cosméticos", // Tipo
      categoria: "Cosméticos", // Categoria
      palavrasChave: ["hidratante", "corporal", "pele seca", "ureia", "hidratacao"] // Palavras
    },
    {
      nome: "Sérum Vitamina C", // Nome
      imagem: "/cosmeticos/SerumVitaminaC.png", // Imagem
      descricao: "Sérum facial antioxidante com vitamina C pura 15%.", // Descrição
      preco: "R$ 68,90", // Preço
      precoAntigo: "R$ 85,90", // Preço anterior
      quantidade: 15, // Estoque
      promocao: true, // Em promoção
      desconto: 20, // Desconto
      tipo: "Cosméticos", // Tipo
      categoria: "Cosméticos", // Categoria
      palavrasChave: ["serum", "vitamina c", "facial", "antioxidante", "anti-idade"] // Palavras
    },
    {
      nome: "Base Líquida FPS 30", // Nome
      imagem: "/cosmeticos/BaseLiquida.png", // Imagem
      descricao: "Base líquida com proteção solar FPS 30, cobertura natural.", // Descrição
      preco: "R$ 39,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 18, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Cosméticos", // Tipo
      categoria: "Cosméticos", // Categoria
      palavrasChave: ["base liquida", "fps 30", "maquiagem", "cobertura", "protetor"] // Palavras
    },
    {
      nome: "Máscara Facial Hidratante", // Nome
      imagem: "/cosmeticos/MascaraFacial.png", // Imagem
      descricao: "Máscara facial hidratante com ácido hialurônico.", // Descrição
      preco: "R$ 25,90", // Preço
      precoAntigo: "R$ 32,90", // Preço anterior
      quantidade: 33, // Estoque
      promocao: true, // Em promoção
      desconto: 21, // Desconto
      tipo: "Cosméticos", // Tipo
      categoria: "Cosméticos", // Categoria
      palavrasChave: ["mascara facial", "hidratante", "acido hialuronico", "skincare"] // Palavras
    },

    // Bucal
    {
      nome: "Enxaguante Bucal Antisséptico", // Nome
      imagem: "/bucal/EnxaguanteBucal.png", // Imagem
      descricao: "Enxaguante bucal antisséptico sem álcool, 500ml.", // Descrição
      preco: "R$ 16,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 42, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Bucal", // Tipo
      categoria: "Bucal", // Categoria
      palavrasChave: ["enxaguante", "bucal", "antisseptico", "halitose", "gengivite"] // Palavras
    },
    {
      nome: "Creme Dental Branqueador", // Nome
      imagem: "/bucal/CremeDental.png", // Imagem
      descricao: "Creme dental branqueador com flúor e bicarbonato.", // Descrição
      preco: "R$ 8,90", // Preço
      precoAntigo: "R$ 11,90", // Preço anterior
      quantidade: 58, // Estoque
      promocao: true, // Em promoção
      desconto: 25, // Desconto
      tipo: "Bucal", // Tipo
      categoria: "Bucal", // Categoria
      palavrasChave: ["creme dental", "branqueador", "fluor", "bicarbonato", "dentes"] // Palavras
    },
    {
      nome: "Fio Dental com Flúor", // Nome
      imagem: "/bucal/FioDental.png", // Imagem
      descricao: "Fio dental encerado com flúor para limpeza interdental.", // Descrição
      preco: "R$ 6,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 67, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Bucal", // Tipo
      categoria: "Bucal", // Categoria
      palavrasChave: ["fio dental", "fluor", "limpeza", "interdental", "higiene"] // Palavras
    },
    {
      nome: "Spray Antisséptico Oral", // Nome
      imagem: "/bucal/SprayOral.png", // Imagem
      descricao: "Spray antisséptico oral para hálito fresco instantâneo.", // Descrição
      preco: "R$ 12,90", // Preço
      precoAntigo: "", // Sem preço anterior
      quantidade: 29, // Estoque
      promocao: false, // Sem promoção
      desconto: 0, // Sem desconto
      tipo: "Bucal", // Tipo
      categoria: "Bucal", // Categoria
      palavrasChave: ["spray oral", "antisseptico", "halito", "fresco", "portatil"] // Palavras
    },
    {
      nome: "Gel Dental Sensibilidade", // Nome
      imagem: "/bucal/GelDental.png", // Imagem
      descricao: "Gel dental para dentes sensíveis com nitrato de potássio.", // Descrição
      preco: "R$ 14,90", // Preço
      precoAntigo: "R$ 18,90", // Preço anterior
      quantidade: 21, // Estoque
      promocao: true, // Em promoção
      desconto: 21, // Desconto
      tipo: "Bucal", // Tipo
      categoria: "Bucal", // Categoria
      palavrasChave: ["gel dental", "sensibilidade", "dentes sensiveis", "nitrato potassio"] // Palavras
    }
  ];

  // Getter computado que devolve a lista de produtos após aplicar categoria, tipo e termo de busca
  get produtosFiltrados() {
    let produtosFiltradosPorTipo = this.produtos; // Começa com todos os produtos
    
    if (this.categoriaAtiva !== 'Todos') { // Se houver uma categoria específica selecionada
      produtosFiltradosPorTipo = this.produtos.filter(produto => produto.categoria === this.categoriaAtiva); // Filtra por categoria
    }

    if (this.filtroAtivo !== 'Todos') { // Se houver um tipo específico selecionado
      produtosFiltradosPorTipo = produtosFiltradosPorTipo.filter(produto => produto.tipo === this.filtroAtivo); // Filtra por tipo
    }
    
    if (this.termoPesquisa.trim() === '') { // Se não há termo de busca digitado
      return produtosFiltradosPorTipo; // Retorna o que já foi filtrado por categoria/tipo
    }
    
    const termo = this.termoPesquisa.toLowerCase().trim(); // Normaliza o termo para busca case-insensitive
    
    return produtosFiltradosPorTipo.filter(produto => { // Aplica filtro por texto
      const nomeMatch = produto.nome.toLowerCase().includes(termo); // Verifica se o nome contém o termo
      const descricaoMatch = produto.descricao.toLowerCase().includes(termo); // Verifica na descrição
      const palavrasChaveMatch = produto.palavrasChave.some(palavra =>  // Verifica nas palavras-chave
        palavra.toLowerCase().includes(termo)
      );
      
      return nomeMatch || descricaoMatch || palavrasChaveMatch; // Inclui se qualquer campo corresponder
    });
  }

  // Computa o total de itens no carrinho somando as quantidades
  get contadorCarrinho(): number {
    return this.carrinho.reduce((acc, item) => acc + item.quantidade, 0); // Soma incremental das quantidades
  }

  // Ativa um filtro por categoria e rola a tela até a seção de produtos
  filtrarPorCategoria(categoria: string) {
    this.categoriaAtiva = categoria; // Atualiza a categoria ativa
    this.filtroAtivo = 'Todos'; // Reseta o filtro de tipo ao trocar de categoria
    this.termoPesquisa = ''; // Limpa o termo de busca ao trocar de categoria
    
    setTimeout(() => { // Aguarda o ciclo de renderização para garantir que a seção exista no DOM
      const secaoProdutos = document.getElementById('secao-produtos'); // Busca a seção de produtos
      if (secaoProdutos) { // Se encontrada
        secaoProdutos.scrollIntoView({  // Faz scroll suave até a seção
          behavior: 'smooth', 
          block: 'start', // Alinha ao topo da seção
          inline: 'nearest' // Comportamento horizontal padrão
        });
      }
    }, 100); // Pequeno atraso para sincronizar com o DOM
    
    if (categoria === 'Todos') { // Se todas as categorias estiverem ativas
      this.toastr.info('Mostrando todos os produtos', 'Filtro', { // Exibe toast informativo
        timeOut: 2000, // Tempo de exibição
        progressBar: true // Barra de progresso visual
      });
    } else { // Caso uma categoria específica
      this.toastr.info(`Filtrando por categoria: ${categoria}`, 'Categoria', { // Toast com categoria escolhida
        timeOut: 2000,
        progressBar: true
      });
    }
  }

  // Ativa um filtro de tipo (Genéricos, Referência, etc.)
  filtrarProdutos(tipo: string) {
    this.filtroAtivo = tipo; // Atualiza o tipo de filtro ativo
    this.toastr.info(`Filtrando produtos: ${tipo}`, 'Filtro Aplicado', { // Feedback ao usuário
      timeOut: 2000,
      progressBar: true
    });
  }

  // Limpa o termo de busca e avisa o usuário
  limparPesquisa() {
    this.termoPesquisa = ''; // Zera o texto da pesquisa
    this.toastr.info('Pesquisa limpa', 'Busca', { // Exibe toast de confirmação
      timeOut: 2000,
      progressBar: true
    });
  }

  // Reseta todos os filtros (categoria, tipo e busca)
  limparTodosFiltros() {
    this.categoriaAtiva = 'Todos'; // Reseta categoria
    this.filtroAtivo = 'Todos'; // Reseta tipo de filtro
    this.termoPesquisa = ''; // Limpa busca
    
    this.toastr.info('Todos os filtros foram limpos', 'Filtros', { // Toast de feedback
      timeOut: 2000,
      progressBar: true
    });
  }

  // Exibe a quantidade de estoque de um produto, com alerta se estiver baixo
  mostrarQuantidade(nome: string, quantidade: number) {
    if (quantidade < 5) { // Estoque crítico
      this.toastr.warning(`Atenção! Restam apenas ${quantidade} unidades de ${nome}`, 'Estoque Baixo', { // Mostra aviso
        timeOut: 4000,
        progressBar: true
      });
    } else { // Estoque confortável
      this.toastr.info(`${quantidade} unidades disponíveis de ${nome}`, 'Estoque', { // Mostra informação
        timeOut: 3000,
        progressBar: true
      });
    }
  }

  // Adiciona um produto ao carrinho (incrementa se já existir)
  adicionarAoCarrinho(produto: string) {
    const index = this.carrinho.findIndex(p => p.nome === produto); // Procura item pelo nome
    if (index >= 0) { // Se já existe no carrinho
      this.carrinho[index].quantidade++; // Incrementa a quantidade
    } else { // Caso ainda não exista
      this.carrinho.push({ nome: produto, quantidade: 1 }); // Adiciona novo item com quantidade 1
    }
    
    this.toastr.success(`${produto} adicionado ao carrinho!`, 'Sucesso!'); // Feedback de sucesso
  }

  // Remove um item do carrinho pelo índice
  removerDoCarrinho(index: number) {
    const produtoRemovido = this.carrinho[index]; // Guarda referência para mensagem
    this.carrinho.splice(index, 1); // Remove do array
    
    this.toastr.warning(`${produtoRemovido.nome} removido do carrinho`, 'Item Removido', { // Toast de remoção
      timeOut: 3000,
      progressBar: true
    });
  }

  // Abre o modal do carrinho; se estiver vazio, avisa o usuário
  abrirCarrinho() {
    this.modalAberto = true; // Exibe o modal
    if (this.carrinho.length === 0) { // Se não há itens
      this.toastr.info('Seu carrinho está vazio', 'Carrinho', { // Informação para o usuário
        timeOut: 2000,
        progressBar: true
      });
    }
  }

  // Fecha o modal do carrinho
  fecharCarrinho() {
    this.modalAberto = false; // Esconde o modal
  }

  // Volta para a página do formulário (rota '/formulario')
  voltar() {
    this.toastr.info('Retornando à página inicial', 'Navegação', { // Notifica a navegação
      timeOut: 2000,
      progressBar: true
    });
    this.router.navigate(['/formulario']); // Navega para a rota desejada
  }

  // Finaliza a compra: valida carrinho, mostra feedbacks e limpa após simular checkout
  finalizarCompra() {
    if (this.carrinho.length === 0) { // Impede finalizar sem itens
      this.toastr.error('Adicione produtos ao carrinho antes de finalizar', 'Carrinho Vazio', { // Erro para o usuário
        timeOut: 3000,
        progressBar: true
      });
      return; // Sai do método
    }

    this.toastr.success('Redirecionando para o checkout...', 'Finalizando Compra', { // Informa início do processo
      timeOut: 3000,
      progressBar: true
    });
    
    setTimeout(() => { // Simula um atraso de processamento/redirect
      this.toastr.info('Obrigado pela preferência! Pedido em processamento', 'Sucesso', { // Mensagem final amigável
        timeOut: 5000,
        progressBar: true
      });
      this.carrinho = []; // Limpa o carrinho após finalizar
      this.fecharCarrinho(); // Fecha o modal do carrinho
    }, 2000); // Tempo de simulação
  }
}