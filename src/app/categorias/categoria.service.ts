import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias';

  meuToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIiwidXBkYXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTY4MDQwODcwLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSIsIlJPTEVfQVRVQUxJWkFSX1BFU1NPQSJdLCJqdGkiOiJjZTE2OGEzZS01YTcxLTQ5OGQtYWMzNS1kNmQwYzBmZDdiYTIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.pcfnRqjS-RE9UpmAdIh-Lsuf8oV1SffW7fB-AWyuhIM';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', `Bearer ${this.meuToken}`);

    return this.http.get(this.categoriaUrl, { headers })
                    .toPromise()
                    .then(response => response);
  }
}
