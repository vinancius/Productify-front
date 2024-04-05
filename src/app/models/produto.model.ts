export class Produto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    dataDeCriacao: Date;
  
    constructor(id: number, nome: string, preco: number, descricao: string, dataDeCriacao: Date) {
      this.id = id;
      this.nome = nome;
      this.preco = preco;
      this.descricao = descricao;
      this.dataDeCriacao = dataDeCriacao;
    }
  }