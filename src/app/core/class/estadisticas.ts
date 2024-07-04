
import { Injectable } from '@angular/core';


interface IEstadisticas {
  Mtomes : string;
    Mtomesusd : string;
    Mtomesant : string;
    Mtomesantusd : string;
    Tasadia : string;
}

@Injectable({
  providedIn: 'root' // or the specific module
})

export class Estadisticas implements IEstadisticas {
    Mtomes : string;
    Mtomesusd : string;
    Mtomesant : string;
    Mtomesantusd : string;
    Tasadia : string;

  constructor() {
    this.Mtomes = '';
    this.Mtomesusd = '';
    this.Mtomesant = '';
    this.Mtomesantusd = '';
    this.Tasadia = '';
  }
}
