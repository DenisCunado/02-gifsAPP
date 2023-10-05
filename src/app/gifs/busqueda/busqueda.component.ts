import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  //Busca el elemento con #txtBuscar y lo asigna a txtBuscar, es del tipo elementref
  //!not null assertion operator, para indicar que siempre va a tener algo.

  constructor(private GifsService:GifsService){}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    //console.log(valor);
    

    if(valor.trim().length === 0 ){
    console.log("No");
    } else {
    this.GifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value='';
    }
  }
}