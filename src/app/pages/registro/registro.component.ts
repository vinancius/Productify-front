import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdutosServiceService } from '../../service/produtosService/produtos-service.service';
import { Produto } from '../../models/produto.model';
import { ProdutoDTO } from '../../models/produtoDto.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  editMode: Boolean = false;

  produto: ProdutoDTO = {
    nome: "",
    descricao: "",
    preco: 0,
  };

  constructor(private route: ActivatedRoute, private produtosService: ProdutosServiceService, private page: Router,
    private __snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.editMode = true;
        this.listarProdutoById(id);
      } else {
        this.editMode = false;
      }
    });
  }

  validarCampos(): boolean {
    if(this.produto.descricao === "" || this.produto.nome == "" 
      || this.produto.preco === 0) {
        return false;
    }

    if(this.produto.preco < 0) {
      return false;
    }

    return true;
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
          this.produto.nome = data.nome || '';
          this.produto.descricao = data.descricao || '';
          this.produto.preco = data.preco || 0;
        } else {
          this.openSnackBar("Não foi possível trazer dados do produto!","fechar")
        }
      },
      (error) => {
        // Lidar com erros da chamada da API
        this.openSnackBar("Ocorreu um erro ao trazer dados do produto!","fechar")
      });
  
  }

  adicionarProduto() {
    if(this.validarCampos()) {
      let body = {
        nome: this.produto.nome,
        descricao: this.produto.descricao,
        preco: this.produto.preco
      }

      this.produtosService.adicionarProduto(body).subscribe((data) => {
        this.voltar()
      },
      (error) => {
        // Lidar com erros da chamada da API
        this.openSnackBar("Erro ao adicionar o produto!","fechar")
      });
    } else {
      this.openSnackBar("Preencha corretamente os campos!","fechar")
    } 
  }

  editarProduto() {
    if(this.validarCampos()) {
      this.route.queryParams.subscribe(params => {
        const id = params['id'];
        let body = {
          id: id,
          nome: this.produto.nome,
          descricao: this.produto.descricao,
          preco: this.produto.preco
        }
        this.produtosService.atualizarProduto(body,id).subscribe((data) => {
          this.voltar()
        },
        (error) => {
          this.openSnackBar("Erro ao editar o produto!","fechar")
        });
      });
    } else {
      this.openSnackBar("Preencha corretamente os campos!","fechar")
    }  
  }
}
