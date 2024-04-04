import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
];

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
