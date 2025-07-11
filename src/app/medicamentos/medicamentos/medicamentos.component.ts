import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class MedicamentosComponent {
  carrinho: { nome: string, quantidade: number }[] = [];
  modalAberto = false;
  constructor(private router: Router) {}
  adicionais = [
    { nome: "Amoxicilina 500mg", imagem: "/Amoxicilina.png", quantidade: 20 },
    { nome: "Azitromicina 500mg", imagem: "/Azitromicina.png",quantidade: 15 },
    { nome: "Losartana Potássica 50mg", imagem: "/LosartanaPotassica.png", quantidade: 40 },
    { nome: "Omeprazol 20mg", imagem: "/Omeprazol.png", quantidade: 35 },
    { nome: "Cetirizina 10mg", imagem: "/Cetirizina.png", quantidade: 22 },
    { nome: "Cloridrato de Sertralina 50mg", imagem: "/CloridratodeSertralina.png", quantidade: 12 },
    { nome: "Fluoxetina 20mg", imagem: "/Fluoxetina.png", quantidade: 18 },
    { nome: "Sinvastatina 20mg", imagem: "/Sinvastatina.png", quantidade: 27 },
    { nome: "Enalapril 10mg", imagem: "/Enalapril.png", quantidade: 17 },
    { nome: "Metformina 850mg", imagem: "/Metformina.png", quantidade: 33 },
    { nome: "Gliclazida 30mg", imagem: "/Gliclazida.png", quantidade: 21 },
    { nome: "Captopril 25mg", imagem: "/Captopril.png", quantidade: 29 },
    { nome: "Ranitidina 150mg", imagem: "/Ranitidina.png", quantidade: 24 },
    { nome: "Lorazepam 2mg", imagem: "/Lorazepam.png", quantidade: 10 },
    { nome: "Prednisona 20mg", imagem: "/Prednisona.png", quantidade: 11 },
    { nome: "Furosemida 40mg", imagem: "/Furosemida.png", quantidade: 19 },
    { nome: "Paracetamol 500mg", imagem: "/Paracetamol.png", quantidade: 25},
    { nome: "Dipirona Sódica 1g", imagem: "/DipironaSodica.png", quantidade: 40 },
    { nome: "Ibuprofeno 600mg", imagem: "/Ibuprofeno.png", quantidade: 30 },
  ];

  produtos = [
    {
      nome: "Paracetamol 500mg",
      imagem: "/Paracetamol.png",
      descricao: "Analgésico e antitérmico para dores e febres.",
      preco: "R$ 9,90",
      quantidade: 25
    },
    {
      nome: "Dipirona Sódica 1g",
      imagem: "/DipironaSodica.png",
      descricao: "Analgésico e antipirético para alívio de dor e febre.",
      preco: "R$ 7,50",
      quantidade: 40
    },
    {
      nome: "Ibuprofeno 600mg",
      imagem: "/Ibuprofeno.png",
      descricao: "Anti-inflamatório, analgésico e antitérmico.",
      preco: "R$ 14,90",
      quantidade: 30
    },
    {
      nome: "Amoxicilina 500mg",
      imagem: "/Amoxicilina.png",
      descricao: "Antibiótico para infecções bacterianas.",
      preco: "R$ 19,90",
      quantidade: 20
    },
    {
      nome: "Azitromicina 500mg",
      imagem: "/Azitromicina.png",
      descricao: "Antibiótico de amplo espectro.",
      preco: "R$ 22,50",
      quantidade: 15
    },
    {
      nome: "Losartana Potássica 50mg",
      imagem: "/LosartanaPotassica.png",
      descricao: "Antihipertensivo para controle da pressão arterial.",
      preco: "R$ 18,90",
      quantidade: 40
    },
    {
      nome: "Omeprazol 20mg",
      imagem: "/Omeprazol.png",
      descricao: "Inibidor de bomba de prótons para problemas gástricos.",
      preco: "R$ 12,90",
      quantidade: 35
    },
    {
      nome: "Cetirizina 10mg",
      imagem: "/Cetirizina.png",
      descricao: "Antialérgico para alívio de sintomas alérgicos.",
      preco: "R$ 8,90",
      quantidade: 22
    },
    {
      nome: "Cloridrato de Sertralina 50mg",
      imagem: "/CloridratodeSertralina.png",
      descricao: "Antidepressivo ISRS para tratamento de depressão e ansiedade.",
      preco: "R$ 29,90",
      quantidade: 12
    },
    {
      nome: "Fluoxetina 20mg",
      imagem: "/Fluoxetina.png",
      descricao: "Antidepressivo ISRS para tratamento de depressão, transtorno de ansiedade, bulimia e TOC.",
      preco: "R$ 24,90",
      quantidade: 18
    },
    {
      nome: "Sinvastatina 20mg",
      imagem: "/Sinvastatina.png",
      descricao: "Estatina para redução do colesterol LDL.",
      preco: "R$ 16,90",
      quantidade: 27
    },
    {
      nome: "Enalapril 10mg",
      imagem: "/Enalapril.png",
      descricao: "Inibidor da ECA para tratamento de hipertensão arterial.",
      preco: "R$ 15,90",
      quantidade: 17
    },
    {
      nome: "Metformina 850mg",
      imagem: "/Metformina.png",
      descricao: "Antidiabético oral para controle de diabetes tipo 2.",
      preco: "R$ 20,90",
      quantidade: 33
    },
    {
      nome: "Gliclazida 30mg",
      imagem: "/Gliclazida.png",
      descricao: "Antidiabético oral para controle de diabetes tipo 2.",
      preco: "R$ 21,90",
      quantidade: 21
    },
    {
      nome: "Captopril 25mg",
      imagem: "/Captopril.png",
      descricao: "Inibidor da ECA para tratamento de hipertensão arterial.",
      preco: "R$ 13,90",
      quantidade: 29
    },
    {
      nome: "Ranitidina 150mg",
      imagem: "/Ranitidina.png",
      descricao: "Antagonista H2 para redução da acidez gástrica.",
      preco: "R$ 11,90",
      quantidade: 24
    },
    {
      nome: "Lorazepam 2mg",
      imagem: "/Lorazepam.png",
      descricao: "Benzodiazepínico para tratamento de ansiedade e insônia.",
      preco: "R$ 17,90",
      quantidade: 10
    },
    {
      nome: "Prednisona 20mg",
      imagem: "/Prednisona.png",
      descricao: "Corticosteroide para tratamento de inflamações e alergias.",
      preco: "R$ 23,90",
      quantidade: 11
    },
    {
      nome: "Furosemida 40mg",
      imagem: "/Furosemida.png",
      descricao: "Diurético para tratamento de retenção de líquidos e hipertensão.",
      preco: "R$ 14,50",
      quantidade: 19
    }
  ];

  get contadorCarrinho(): number {
    return this.carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }

  mostrarQuantidade(nome: string, quantidade: number) {
    alert(`Quantidade disponível de ${nome}: ${quantidade} unidades.`);
  }

  adicionarAoCarrinho(produto: string) {
    const index = this.carrinho.findIndex(p => p.nome === produto);
    if (index >= 0) {
      this.carrinho[index].quantidade++;
    } else {
      this.carrinho.push({ nome: produto, quantidade: 1 });
    }
  }

  removerDoCarrinho(index: number) {
    this.carrinho.splice(index, 1);
  }

  abrirCarrinho() {
    this.modalAberto = true;
  }

  fecharCarrinho() {
    this.modalAberto = false;
  }
   voltar() {
    this.router.navigateByUrl('/');
  }
}
