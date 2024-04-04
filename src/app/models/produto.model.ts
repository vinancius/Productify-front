export class Produto {
    ID: number;
    Nome: string;
    Preco: number;
    Descricao: string;
    DataDeCriacao: Date;
  
    constructor(id: number, nome: string, preco: number, descricao: string, dataDeCriacao: Date) {
      this.ID = id;
      this.Nome = nome;
      this.Preco = preco;
      this.Descricao = descricao;
      this.DataDeCriacao = dataDeCriacao;
    }
  }