import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosServiceService } from '../../service/produtosService/produtos-service.service';
import { Produto } from '../../models/produto.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [
    MatListModule, MatDividerModule
  ],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {

  produto: Produto = {
    id: 0,
    nome: "",
    descricao: "",
    preco: 0,
    dataDeCriacao: new Date()
  };

  constructor(private route: ActivatedRoute, private produtosService: ProdutosServiceService, private page: Router,
    private __snackBar: MatSnackBar, private datePipe :DatePipe) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.listarProdutoById(id);
    });
  }

  formatarDataEHora(data: Date): string {
    const date = new Date(data);
    // Ajustar o fuso horário para Brasília (UTC-3)
    date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
    return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm:ss') || '';
  }

  voltar() {
    this.page.navigate(["/produtos"])
  }

  openSnackBar(message: string, action: string) {
    this.__snackBar.open(message, action);
  }

  listarProdutoById(id: number) {
    this.produtosService.listarProdutoById(id).subscribe((data: Produto) => {
      if(data) {
        this.produto = data;
      } else {
        this.openSnackBar('Não foi possível trazer dados do produto!',"fechar")
      }
    },
    (error) => {
      // Lidar com erros da chamada da API
      this.openSnackBar('Não foi possível trazer os dados do produto!',"fechar")
    });

}
     
}
