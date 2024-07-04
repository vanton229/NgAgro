import { Component, OnInit } from '@angular/core';
import { AutenticaCli } from '@laranda/lib-ultra-net';
import { DameOrdenMandatoService } from '../../services/dame-orden-mandato.service';
import { OrdenMandato } from '../../class/orden-mandato';
import { SysFecha } from '@laranda/lib-sysutil';
import { Estadisticas } from '../../class/estadisticas';
import { interval  } from 'rxjs';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  ordenesveb : OrdenMandato[]=[];
  ordenesusd : OrdenMandato[]=[];
  desde!:string;
  hasta!: string;
  moneda!:string;
  sysFecha = new SysFecha();
  mtomes! : string;
  mtomesant! : string;
  dtColumnas: DataTables.ColumnSettings[] = [];
  

  constructor(
    private autenticaCli: AutenticaCli,
    public  dameorden : DameOrdenMandatoService,
     /**
      * estadisticas     */
     public estadisticasagro : Estadisticas

  ) {
    const contador = interval(5000); // Intervalo de 3 segundo

    // Suscribirse al observable para ejecutar el proceso
  const suscripcion = contador.subscribe({
  next: (valor) => {
    console.log(`Tick: ${valor}`);

this.procesarFecha();
  
  },
  error: (error) => {
    console.error('Algo salió mal: ', error);
  },
  complete: () => {
    console.log('Completado');
  }
  });

 
  }

  ngOnInit(): void {
    this.hasta = new Date().toISOString().split('T')[0]
   this.dameorden.consultarorden(this.desde,this.hasta).then(() => {
      this.ordenesveb =this.dameorden.Orden.filter(val => val.Monedaefectiva === '000');
      console.log(this.ordenesveb);
      this.ordenesusd =this.dameorden.Orden.filter(val => val.Monedaefectiva === '001');
      console.log(this.ordenesusd);
   }).then (() => {
    this.dameorden.consultarestadisticas(this.hasta).then(() => {
      this.estadisticasagro = this.dameorden.estadisticas;
      this.mtomes = this.estadisticasagro.Mtomes;
      this.mtomesant = this.estadisticasagro.Mtomesant;
    })
   })

  }

  salir() {
    this.autenticaCli.logOut();
    sessionStorage.clear();
  }
  
  procesarFecha(){
    this.desde = this.sysFecha.fechaHoy();
    this.hasta = this.desde;
   
  console.log(this.desde);
  console.log(this.hasta);
  this.dameorden.consultarorden(this.desde,this.hasta).then(() => {
    this.ordenesveb =this.dameorden.Orden.filter(val => val.Monedaefectiva === '000');
    console.log(this.ordenesveb);
    this.ordenesusd =this.dameorden.Orden.filter(val => val.Monedaefectiva === '001');
    console.log(this.ordenesusd);
 }).then (() => {
  this.dameorden.consultarestadisticas(this.hasta).then(() => {
    this.estadisticasagro = this.dameorden.estadisticas;
    this.mtomes = this.estadisticasagro.Mtomes;
    this.mtomesant = this.estadisticasagro.Mtomesant;
  })
 })
  }


}
