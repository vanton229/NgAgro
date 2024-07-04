import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutenticaCli, DameCalendario } from '@laranda/lib-ultra-net';
import { ConectorService, TranslateLAService } from '@laranda/lib-sysutil';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  browserLang = '';
 usuarioactivo! : string; 


  @Input() seleccionVisible = true;
  @Output() idioma = new EventEmitter<string>();

  constructor(
    public dameCalendario: DameCalendario,
    public conectorService: ConectorService,
    private autenticaCli: AutenticaCli,
    private translateLAService: TranslateLAService,
  ) { }

  ngOnInit(): void {
    
    this.dameCalendario.consultar(this.conectorService.info.URL_REST);

    this.browserLang = this.translateLAService.getBrowserLang();
    this.modificarIdioma(this.browserLang.match(/es|en/) ? this.browserLang : 'es');
    this.idioma.emit(this.browserLang);

    this.autenticaCli.leerToken();
    this.usuarioactivo = this.autenticaCli.CadOut.Nombre;
   

  }

  modificarIdioma(tipo: string) {
    this.browserLang = tipo;
    this.translateLAService.usarIdioma(tipo);
    this.translateLAService.busca_title('Idioma Español', 'idEspañol');
    this.translateLAService.busca_title('Idioma Inglés', 'idIngles');
    this.idioma.emit(tipo);
  }


}
