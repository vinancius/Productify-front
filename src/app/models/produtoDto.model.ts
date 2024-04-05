export class ProdutoDTO {
  nome: string;
  preco: number;
  descricao: string;

  constructor(nome: string, preco: number, descricao: string) {
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
  }
}