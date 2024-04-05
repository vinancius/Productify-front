import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProdutosServiceService } from '../../service/produtosService/produtos-service.service';
import { ListaPaginada } from '../../models/listaPaginada.model';
import { DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto.model';
import { MatIconModule } from '@angular/material/icon';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  displayedColumns: string[] = ['id', 'nome', 'preco', 'dataDeCriacao', 'acoes'];

  listaPaginada: ListaPaginada = {
    itens: [],
    page: 0,
    total: 0,
    totalPages: 5,
  };

  constructor (
    private router: Router, 
    private produtosService: ProdutosServiceService, 
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  async listarProdutos() {
    this.produtosService.listarProdutos().subscribe(data => {
      this.listaPaginada = <ListaPaginada>(data);
    })
  }

  adicionarProduto() {
    this.router.navigate(["/registro"])
  }

  editarProduto(item: Produto) {
    this.router.navigate(["/registro"], { queryParams: { id: item.id } })
  }

  formatarDataEHora(data: string): string {
    const date = new Date(data);
    // Ajustar o fuso horário para Brasília (UTC-3)
    date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
    return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm:ss') || '';
  }

  deletarProduto(item: Produto) {
    this.produtosService.deletarProduto(item.id).subscribe(
      response => {
        this.listarProdutos();
      },
      error => {
        alert(`Ocorreu um problema ao excluir produto ${item.nome}`);
      }
    )
  }

  visualizarProduto(item: Produto) {
    this.router.navigate(["/detalhes"], { queryParams: { id: item.id } })
  }


}
