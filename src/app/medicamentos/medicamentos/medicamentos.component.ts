import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class MedicamentosComponent {
  carrinho: { nome: string, quantidade: number }[] = [];
  modalAberto = false;
  filtroAtivo = 'Todos';
  termoPesquisa = '';
  
  constructor(private router: Router, private toastr: ToastrService) {}

  produtos = [
    {
      nome: "Paracetamol 500mg",
      imagem: "/Paracetamol.png",
      descricao: "Analgésico e antitérmico para dores e febres.",
      preco: "R$ 9,90",
      precoAntigo: "R$ 12,90",
      quantidade: 25,
      promocao: true,
      desconto: 23,
      tipo: "Genéricos",
      palavrasChave: ["paracetamol", "analgesico", "dor", "febre", "acetaminofeno"]
    },
    {
      nome: "Dipirona Sódica 1g",
      imagem: "/DipironaSodica.png",
      descricao: "Analgésico e antipirético para alívio de dor e febre.",
      preco: "R$ 7,50",
      precoAntigo: "",
      quantidade: 40,
      promocao: false,
      desconto: 0,
      tipo: "Genéricos",
      palavrasChave: ["dipirona", "analgesico", "dor", "febre", "metamizol"]
    },
    {
      nome: "Ibuprofeno 600mg",
      imagem: "/Ibuprofeno.png",
      descricao: "Anti-inflamatório, analgésico e antitérmico.",
      preco: "R$ 14,90",
      precoAntigo: "R$ 18,90",
      quantidade: 30,
      promocao: true,
      desconto: 21,
      tipo: "Referência",
      palavrasChave: ["ibuprofeno", "anti-inflamatorio", "dor", "inflamacao", "artrite"]
    },
    {
      nome: "Amoxicilina 500mg",
      imagem: "/Amoxicilina.png",
      descricao: "Antibiótico para infecções bacterianas.",
      preco: "R$ 19,90",
      precoAntigo: "",
      quantidade: 20,
      promocao: false,
      desconto: 0,
      tipo: "Similares",
      palavrasChave: ["amoxicilina", "antibiotico", "infeccao", "bacteria", "penicilina"]
    },
    {
      nome: "Azitromicina 500mg",
      imagem: "/Azitromicina.png",
      descricao: "Antibiótico de amplo espectro.",
      preco: "R$ 22,50",
      precoAntigo: "R$ 29,90",
      quantidade: 15,
      promocao: true,
      desconto: 25,
      tipo: "Referência",
      palavrasChave: ["azitromicina", "antibiotico", "infeccao", "respiratoria", "zitromax"]
    },
    {
      nome: "Losartana Potássica 50mg",
      imagem: "/LosartanaPotassica.png",
      descricao: "Antihipertensivo para controle da pressão arterial.",
      preco: "R$ 18,90",
      precoAntigo: "",
      quantidade: 40,
      promocao: false,
      desconto: 0,
      tipo: "Genéricos",
      palavrasChave: ["losartana", "pressao", "hipertensao", "cardiovascular", "coração"]
    },
    {
      nome: "Omeprazol 20mg",
      imagem: "/Omeprazol.png",
      descricao: "Inibidor de bomba de prótons para problemas gástricos.",
      preco: "R$ 12,90",
      precoAntigo: "R$ 16,90",
      quantidade: 35,
      promocao: true,
      desconto: 24,
      tipo: "Similares",
      palavrasChave: ["omeprazol", "gastrite", "azia", "estomago", "refluxo"]
    },
    {
      nome: "Cetirizina 10mg",
      imagem: "/Cetirizina.png",
      descricao: "Antialérgico para alívio de sintomas alérgicos.",
      preco: "R$ 8,90",
      precoAntigo: "",
      quantidade: 22,
      promocao: false,
      desconto: 0,
      tipo: "Genéricos",
      palavrasChave: ["cetirizina", "alergia", "antialergico", "rinite", "urticaria"]
    },
    {
      nome: "Cloridrato de Sertralina 50mg",
      imagem: "/CloridratodeSertralina.png",
      descricao: "Antidepressivo ISRS para tratamento de depressão e ansiedade.",
      preco: "R$ 29,90",
      precoAntigo: "",
      quantidade: 12,
      promocao: false,
      desconto: 0,
      tipo: "Referência",
      palavrasChave: ["sertralina", "antidepressivo", "depressao", "ansiedade", "zoloft"]
    },
    {
      nome: "Fluoxetina 20mg",
      imagem: "/Fluoxetina.png",
      descricao: "Antidepressivo ISRS para tratamento de depressão, transtorno de ansiedade, bulimia e TOC.",
      preco: "R$ 24,90",
      precoAntigo: "R$ 32,90",
      quantidade: 18,
      promocao: true,
      desconto: 24,
      tipo: "Similares",
      palavrasChave: ["fluoxetina", "antidepressivo", "depressao", "ansiedade", "prozac"]
    },
    {
      nome: "Sinvastatina 20mg",
      imagem: "/Sinvastatina.png",
      descricao: "Estatina para redução do colesterol LDL.",
      preco: "R$ 16,90",
      precoAntigo: "",
      quantidade: 27,
      promocao: false,
      desconto: 0,
      tipo: "Genéricos",
      palavrasChave: ["sinvastatina", "colesterol", "estatina", "triglicerides", "cardiovascular"]
    },
    {
      nome: "Enalapril 10mg",
      imagem: "/Enalapril.png",
      descricao: "Inibidor da ECA para tratamento de hipertensão arterial.",
      preco: "R$ 15,90",
      precoAntigo: "",
      quantidade: 17,
      promocao: false,
      desconto: 0,
      tipo: "Similares",
      palavrasChave: ["enalapril", "pressao", "hipertensao", "cardiovascular", "ace"]
    },
    {
      nome: "Metformina 850mg",
      imagem: "/Metformina.png",
      descricao: "Antidiabético oral para controle de diabetes tipo 2.",
      preco: "R$ 20,90",
      precoAntigo: "R$ 26,90",
      quantidade: 33,
      promocao: true,
      desconto: 22,
      tipo: "Referência",
      palavrasChave: ["metformina", "diabetes", "glicose", "acucar", "diabetico"]
    },
    {
      nome: "Gliclazida 30mg",
      imagem: "/Gliclazida.png",
      descricao: "Antidiabético oral para controle de diabetes tipo 2.",
      preco: "R$ 21,90",
      precoAntigo: "",
      quantidade: 21,
      promocao: false,
      desconto: 0,
      tipo: "Similares",
      palavrasChave: ["gliclazida", "diabetes", "glicose", "acucar", "diabetico"]
    },
    {
      nome: "Captopril 25mg",
      imagem: "/Captopril.png",
      descricao: "Inibidor da ECA para tratamento de hipertensão arterial.",
      preco: "R$ 13,90",
      precoAntigo: "",
      quantidade: 29,
      promocao: false,
      desconto: 0,
      tipo: "Genéricos",
      palavrasChave: ["captopril", "pressao", "hipertensao", "cardiovascular", "ace"]
    },
    {
      nome: "Ranitidina 150mg",
      imagem: "/Ranitidina.png",
      descricao: "Antagonista H2 para redução da acidez gástrica.",
      preco: "R$ 11,90",
      precoAntigo: "",
      quantidade: 24,
      promocao: false,
      desconto: 0,
      tipo: "Similares",
      palavrasChave: ["ranitidina", "gastrite", "azia", "estomago", "acido"]
    },
    {
      nome: "Lorazepam 2mg",
      imagem: "/Lorazepam.png",
      descricao: "Benzodiazepínico para tratamento de ansiedade e insônia.",
      preco: "R$ 17,90",
      precoAntigo: "R$ 23,90",
      quantidade: 4,
      promocao: true,
      desconto: 25,
      tipo: "Referência",
      palavrasChave: ["lorazepam", "ansiedade", "insonia", "calmante", "benzodiazepina"]
    },
    {
      nome: "Prednisona 20mg",
      imagem: "/Prednisona.png",
      descricao: "Corticosteroide para tratamento de inflamações e alergias.",
      preco: "R$ 23,90",
      precoAntigo: "",
      quantidade: 3,
      promocao: false,
      desconto: 0,
      tipo: "Referência",
      palavrasChave: ["prednisona", "corticoide", "inflamacao", "alergia", "anti-inflamatorio"]
    },
    {
      nome: "Furosemida 40mg",
      imagem: "/Furosemida.png",
      descricao: "Diurético para tratamento de retenção de líquidos e hipertensão.",
      preco: "R$ 14,50",
      precoAntigo: "",
      quantidade: 19,
      promocao: false,
      desconto: 0,
      tipo: "Genéricos",
      palavrasChave: ["furosemida", "diuretico", "inchaço", "retencao", "liquido"]
    }
  ];

  get produtosFiltrados() {
    let produtosFiltradosPorTipo = this.produtos;
    

    if (this.filtroAtivo !== 'Todos') {
      produtosFiltradosPorTipo = this.produtos.filter(produto => produto.tipo === this.filtroAtivo);
    }
    

    if (this.termoPesquisa.trim() === '') {
      return produtosFiltradosPorTipo;
    }
    
    const termo = this.termoPesquisa.toLowerCase().trim();
    
    return produtosFiltradosPorTipo.filter(produto => {
    
      const nomeMatch = produto.nome.toLowerCase().includes(termo);
   
      const descricaoMatch = produto.descricao.toLowerCase().includes(termo);
      
    
      const palavrasChaveMatch = produto.palavrasChave.some(palavra => 
        palavra.toLowerCase().includes(termo)
      );
      
      return nomeMatch || descricaoMatch || palavrasChaveMatch;
    });
  }

  get contadorCarrinho(): number {
    return this.carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }

  filtrarProdutos(tipo: string) {
    this.filtroAtivo = tipo;
    this.toastr.info(`Filtrando produtos: ${tipo}`, 'Filtro Aplicado', {
      timeOut: 2000,
      progressBar: true
    });
  }

  limparPesquisa() {
    this.termoPesquisa = '';
    this.toastr.info('Pesquisa limpa', 'Busca', {
      timeOut: 2000,
      progressBar: true
    });
  }

  mostrarQuantidade(nome: string, quantidade: number) {
    if (quantidade < 5) {
      this.toastr.warning(`Atenção! Restam apenas ${quantidade} unidades de ${nome}`, 'Estoque Baixo', {
        timeOut: 4000,
        progressBar: true
      });
    } else {
      this.toastr.info(`${quantidade} unidades disponíveis de ${nome}`, 'Estoque', {
        timeOut: 3000,
        progressBar: true
      });
    }
  }

  adicionarAoCarrinho(produto: string) {
    const index = this.carrinho.findIndex(p => p.nome === produto);
    if (index >= 0) {
      this.carrinho[index].quantidade++;
    } else {
      this.carrinho.push({ nome: produto, quantidade: 1 });
    }
    

    this.toastr.success(`${produto} adicionado ao carrinho!`, 'Sucesso!');
  }

  removerDoCarrinho(index: number) {
    const produtoRemovido = this.carrinho[index];
    this.carrinho.splice(index, 1);
    
    this.toastr.warning(`${produtoRemovido.nome} removido do carrinho`, 'Item Removido', {
      timeOut: 3000,
      progressBar: true
    });
  }

  abrirCarrinho() {
    this.modalAberto = true;
    if (this.carrinho.length === 0) {
      this.toastr.info('Seu carrinho está vazio', 'Carrinho', {
        timeOut: 2000,
        progressBar: true
      });
    }
  }

  fecharCarrinho() {
    this.modalAberto = false;
  }

voltar() {
  this.toastr.info('Retornando à página inicial', 'Navegação', {
    timeOut: 2000,
    progressBar: true
  });
  this.router.navigate(['/formulario']); 
}

  finalizarCompra() {
    if (this.carrinho.length === 0) {
      this.toastr.error('Adicione produtos ao carrinho antes de finalizar', 'Carrinho Vazio', {
        timeOut: 3000,
        progressBar: true
      });
      return;
    }

    this.toastr.success('Redirecionando para o checkout...', 'Finalizando Compra', {
      timeOut: 3000,
      progressBar: true
    });
    

    setTimeout(() => {
      this.toastr.info('Obrigado pela preferência! Pedido em processamento', 'Sucesso', {
        timeOut: 5000,
        progressBar: true
      });
      this.carrinho = []; 
      this.fecharCarrinho();
    }, 2000);
  }
}
