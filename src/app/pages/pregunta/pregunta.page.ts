import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { Asistencia } from 'src/app/model/asistencia';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { log, showAlertDUOC, showAlertYesNoDUOC } from 'src/app/tools/message-routines';
import jsQR, { QRCode } from 'jsqr';
import { BarcodeFormat, BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';
import { MessageEnum } from 'src/app/tools/message-enum';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  correo ='';
  usuario: Usuario = new Usuario();  
  public nombre: string = '';
  public preguntaSecreta: string = '';
  public respuestaSecreta: string = '';
  public respuesta: string = '';
  public password: string = '';

  constructor(private authService: AuthService,
    private bd: DataBaseService,
    private sqliteService: SqliteService,
    private activatedroute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const navigationState = this.activatedroute.paramMap.subscribe(params => {
      const state = history.state;
      this.usuario = state['usuario'];
    });
  }
  
  public irPaginaIngreso(): void {
    this.router.navigate(['/ingreso']);
  }

  async validarCorreoParaRespuesta() {
    
    if (this.respuestaSecreta !== this.usuario.respuestaSecreta) {
      this.router.navigate(['incorrecto']);
    } else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['correcto'], navigationExtras);
    }
  }
  
  
}
