import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[]=[];
  private apiKey:string = 'ssx56yvWcz2Gz4rb0799bgoECT6oCe67';
  private servicioUr1 : string = '';
  public resultados: Gif [] = [];

  get historial()
  { return [...this._historial]; }

  constructor(private http:HttpClient){
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  

  buscarGifs(query:string){
    query=query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      //localStorage.setItem('historial',query);
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('q',query)
    .set('limit',10);
    
    //console.log(this._historial);
    this.http.get<SearchGifsResponse>(`${this.servicioUr1}/search`, {params})
    .subscribe((resp)=> {
      console.log(resp.data);
      this.resultados=resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    });
  }
}

