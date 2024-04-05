import { Produto } from "./produto.model";

export class ListaPaginada {
    itens: Produto[];
    page: number;
    total: number;
    totalPages: number;

    constructor(itens: Produto[], page: number, total: number, totalPages: number) {
        this.itens = itens;
        this.page = page;
        this.total = total;
        this.totalPages = totalPages;
    }
}