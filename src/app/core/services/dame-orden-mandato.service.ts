import { Injectable } from '@angular/core';
import { APIRest, ConectorService } from '@laranda/lib-sysutil';
import swal from 'sweetalert2';
import { OrdenMandato } from '../class/orden-mandato';
import { Observable } from 'rxjs';
import { Estadisticas } from './../class/estadisticas';


@Injectable({
  providedIn: 'root'
})
export class DameOrdenMandatoService {

  Orden : OrdenMandato[] = [];
  

  constructor(
    private aPIRest: APIRest,
    private conectorService: ConectorService,
    public estadisticas : Estadisticas

  ) { }

  private buscarPost_REST(desde:string, hasta:string): Observable<any> {

    const param = {
      Desde: '03/05/2024',
      Hasta: '03/05/2024',
      Status: 4
    };

    return this.aPIRest.post_REST(this.conectorService.info.URL_REST, 'WDame_orden_agro', 'Orden', true, param);
  }

  private llamaPost_estadisticas(hasta:string): Observable<any> {

    const param = {
      Fecha: '03/05/2024',
      Sw_rueda: 'S'
    };

    return this.aPIRest.post_REST(this.conectorService.info.URL_REST, 'WDame_estadisticas_agro', '', false, param);
  }

  consultarorden(desde:string, hasta:string) {
    return new Promise(( resolve, reject ) => {
      this.buscarPost_REST(desde, hasta).subscribe((datosX) => {
        if (datosX.Status !== 0) {
          swal.fire('Error Dame_orden_agro', `Status: ${datosX.Status} \n Mensaje: ${datosX.Mensaje}`  , 'error');
          
          reject(datosX);
        } else {
            this.Orden = datosX.CadJson;
            resolve(this.Orden);
        }
      });
    });
  }


  consultarestadisticas(hasta:string) {
    return new Promise(( resolve, reject ) => {
      this.llamaPost_estadisticas(hasta).subscribe((datosX) => {
        if (datosX.Status !== 0) {
          swal.fire('Error Dame_estadisticas_agro', `Status: ${datosX.Status} \n Mensaje: ${datosX.Mensaje}`  , 'error');
          
          reject(datosX);
        } else {
            this.estadisticas = datosX.CadJson;
            resolve(this.estadisticas);
        }
      });
    });
  }
}
