import { AutenticaCli, RestDameCliente } from '@laranda/lib-ultra-net';
import { ConectorService, TranslateLAService } from '@laranda/lib-sysutil';
import { Component, OnInit } from '@angular/core';
import  swal from 'sweetalert2';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: UntypedFormGroup;
  verPass!: string;
  ConfigCadout: any;


  constructor(
    public autenticaCli: AutenticaCli,
    private fb: UntypedFormBuilder,
    private conectorService: ConectorService,
    private restDameCliente: RestDameCliente,
    private translateLAService: TranslateLAService
  ) {
    this.formLogin = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    const browserLang = translateLAService.getBrowserLang();
    translateLAService.usarIdioma(browserLang.match(/es|en/) ? browserLang : 'es');
  }

  async ngOnInit() {
    this.autenticaCli.ParamIn.User = '';
    this.autenticaCli.ParamIn.Pass = '';
    this.verPass = 'password';

    //  para leer el nombre del cliente LA y ver si esta SUSPENDIDO
    await this.conectorService.getParametros().then(async () => {
      this.restDameCliente.ParamIn.Nucli = this.conectorService.info.NUCLI;
      this.restDameCliente.ParamIn.Url = this.conectorService.info.URL_REST_LA + 'WDame_cliente';
      this.restDameCliente.ParamIn.Proxy.Usarproxy = this.conectorService.info.PROXY.USARPROXY;
      this.restDameCliente.ParamIn.Proxy.Server = this.conectorService.info.PROXY.SERVER;
      this.restDameCliente.ParamIn.Proxy.Puerto = this.conectorService.info.PROXY.PUERTO;
      await this.restDameCliente.consultar(this.conectorService.info.URL_REST);
    });
  }

  get usuarioNoValido() {

    return (this.formLogin.get('user')?.invalid && this.formLogin.get('user')?.touched ||
    (this.formLogin.get('user')?.value.indexOf('0') > -1) );
  }

  get passwordNoValido() {
    return (this.formLogin.get('password')?.invalid && this.formLogin.get('password')?.touched);
  }

  onLogin( ) {
    Object.values( this.formLogin.controls ).forEach( control => {
      if ( control.invalid ) {
        control.markAllAsTouched();
      }
    });

    if (this.formLogin.valid) {
      this.autenticaCli.ParamIn.User = this.formLogin.value.user;
      this.autenticaCli.ParamIn.Pass = this.formLogin.value.password;
      sessionStorage.setItem('nmcliente', JSON.stringify(this.restDameCliente.CadOut.Nombre));

      if (this.restDameCliente.CadOut !== undefined && this.restDameCliente.CadOut.Nombre.indexOf('SUSP') >= 0) {
        const auxTexto = this.translateLAService.buscarPalabra('Cuenta Inactiva....');



        swal.fire({
          icon: 'info',
          text: auxTexto,
          title: 'email soporte@lasistemas.com',
        });
      }
      else {
        this.autenticaCli.logIn(this.conectorService.info.URL_REST);
      }
    }
  }

  claveVisible() {
    this.verPass = 'text';
  }
  claveOculta() {
    this.verPass = 'password';
  }

}
