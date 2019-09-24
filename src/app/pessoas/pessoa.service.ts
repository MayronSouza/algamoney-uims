import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaURL = 'http://localhost:8080/pessoas';

  meuToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIiwidXBkYXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTY5MzM5NDU5LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSIsIlJPTEVfQVRVQUxJWkFSX1BFU1NPQSJdLCJqdGkiOiI1NDc0ZGRmZi1lNTQ2LTQ4OGMtOTMwMy1mNjBhZWMwZTRhMDQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.vA4TsvuCECLZelZA-LFLPaktMlE2hC1U2p0M1LUzmYI';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.meuToken}`);
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(filtro.nome ? `${this.pessoaURL}` : `${this.pessoaURL}?nome`, { headers, params })
                    .toPromise()
                    .then(response => {
                      const pessoas = response['content'];
                      const resultado = {
                        pessoas,
                        total: response['totalElements']
                      }
                      return resultado;
                    });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.meuToken}`);

    return this.http.get(`${this.pessoaURL}?nome`, { headers })
                    .toPromise()
                    .then(response => response['content']);
  }

  excluir(id: number): Promise<void> {

    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.meuToken}`);

    return this.http.delete(`${this.pessoaURL}/${id}?nome`, { headers })
                    .toPromise()
                    .then(() => null);
  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.meuToken}`);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoaURL}/${id}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }
}
