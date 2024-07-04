import { Component, OnInit, Input } from '@angular/core';
import { DameCalendario } from '@laranda/lib-ultra-net';
import { ConectorService, display_d } from '@laranda/lib-sysutil';
import { OrdenMandato } from '../../class/orden-mandato';
import { interval  } from 'rxjs';

@Component({
  selector: 'app-pizarra',
  templateUrl: './pizarra.component.html',
  styleUrls: ['./pizarra.component.scss']
})
export class PizarraComponent implements OnInit {

  visible = true;
  displayd = display_d;
   
  @Input() datosveb : OrdenMandato[]=[];
  @Input() datosusd : OrdenMandato[]=[];

  @Input()montomes! : string;
  @Input()montomesant! : string;
   dtColumnas: DataTables.ColumnSettings[] = [];
  constructor(
    public dameCalendario: DameCalendario,
    public conectorService: ConectorService,


  ) {
    const contador = interval(5000); // Intervalo de 3 segundo

    // Suscribirse al observable para ejecutar el proceso
  const suscripcion = contador.subscribe({
    next: (valor) => {
      this.refrescarpantalla()
    console.log('Refrescando')}
     })
  
   }

  ngOnInit(): void {
    this.dameCalendario.consultar(this.conectorService.info.URL_REST);
   
    this.dtColumnas = [
      { title: 'Cliente', data: 'Cliente' },
      { title: 'Monto', data: 'Montooperacion', className: 'text-right'},
      { title : 'DJ', data: null, render: (data: any, type: any, row: any, meta) => {
        let color = 'text-warning';
        if (data.Swgendj === 'N') {
          color = 'text-danger'}
        else if (data.Swgendj === 'S') {
          color = 'text-success'}
        return  `<i class="fas fa-thermometer-full ${color} "></i>`}},
      { title : 'EB', data: null, render: (data: any, type: any, row: any, meta) => {
        let color = 'text-warning';
        if (data.Swenvbolsa === 'N') {
          color = 'text-danger'}
        else if (data.Swenvbolsa === 'S') {
          color = 'text-success'}
        return  `<i class="fas fa-thermometer-full ${color} "></i>`}},
      { title : 'DJbco', data: null, render: (data: any, type: any, row: any, meta) => {
        let color = 'text-warning';
        if (data.Swdjenvbanco === 'N') {
          color = 'text-danger'}
        else if (data.Swdjenvbanco === 'S') {
          color = 'text-success'}
        return  `<i class="fas fa-thermometer-full ${color} "></i>`}}
    ];    
}

refrescarpantalla() {
  this.dtColumnas = [
    { title: 'Cliente', data: 'Cliente' },
    { title: 'Monto', data: 'Montooperacion', className: 'text-right'},
    { title : 'DJ', data: null, render: (data: any, type: any, row: any, meta) => {
      let color = 'text-warning';
      if (data.Swgendj === 'N') {
        color = 'text-danger'}
      else if (data.Swgendj === 'S') {
        color = 'text-success'}
      return  `<i class="fas fa-thermometer-full ${color} "></i>`}},
    { title : 'EB', data: null, render: (data: any, type: any, row: any, meta) => {
      let color = 'text-warning';
      if (data.Swenvbolsa === 'N') {
        color = 'text-danger'}
      else if (data.Swenvbolsa === 'S') {
        color = 'text-success'}
      return  `<i class="fas fa-thermometer-full ${color} "></i>`}},
    { title : 'DJbco', data: null, render: (data: any, type: any, row: any, meta) => {
      let color = 'text-warning';
      if (data.Swdjenvbanco === 'N') {
        color = 'text-danger'}
      else if (data.Swdjenvbanco === 'S') {
        color = 'text-success'}
      return  `<i class="fas fa-thermometer-full ${color} "></i>`}}
  ];    
  console.log('Refrescando pantalla');
}

}
