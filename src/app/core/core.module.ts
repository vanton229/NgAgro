import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './components/principal/principal.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConectorService, ErrorIntercept, SysutilModule, TranslateLAService } from '@laranda/lib-sysutil';
import { TranslateLAVIService, VisualModule } from '@laranda/lib-visual';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UltranetTablasModule } from '@laranda/lib-ultra-net';
import { PizarraComponent } from './components/pizarra/pizarra.component';

export function ConectorServiceJson(conectorService: ConectorService) {
  return () => conectorService.getParametros();
}

export function TranslateLAJson(translateLAService: TranslateLAService) {
  return () => translateLAService.cargar_Diccionario();
}

@NgModule({
  declarations: [
    PrincipalComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    Error404Component,
    PizarraComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SysutilModule,
    UltranetTablasModule,
    VisualModule
  ],
  providers: [
    TranslateLAVIService,
    TranslateLAService,
    ConectorService,
    {
        provide: APP_INITIALIZER,
        useFactory: ConectorServiceJson,
        deps: [ConectorService],
        multi: true
    },
    {
        provide: APP_INITIALIZER,
        useFactory: TranslateLAJson,
        deps: [TranslateLAService],
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorIntercept,
        multi: true
    }
]
})
export class CoreModule { }
