import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Table } from 'primeng/components/table/table';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
  //   this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
                          .then(resultado => {
                            this.totalRegistros = resultado.total;
                            this.lancamentos = resultado.lancamentos;
                          })
                          .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(lancamento)
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
                          .then(() => {
                            this.grid.reset();
                            this.toastyService.success('Lançamento excluído com sucesso!');
                          })
                          .catch(erro => this.errorHandler.handle(erro));
  }
}
