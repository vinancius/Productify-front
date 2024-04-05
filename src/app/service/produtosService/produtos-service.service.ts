import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosServiceService {

  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = 'http://localhost:8080/api/produtos';
  }

  public listarProdutos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public listarProdutoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`); 
  }

  public adicionarProduto(produto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, produto);
  }

  public atualizarProduto(produto: any, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, produto)
  }

  public deletarProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
