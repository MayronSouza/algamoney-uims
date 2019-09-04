import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categoria = [
    {label: 'Alimentação', value: 1},
    {label: 'Transporte', value: 2}
  ];

  pessoa = [
    {label: 'Liliane Matos', value: 1},
    {label: 'Ana Vitória Souza', value: 2},
    {label: 'João Vitor Souza', value: 3}
  ];

  constructor() { }

  ngOnInit() {
  }

}
