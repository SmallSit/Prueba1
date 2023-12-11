import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ApiClientService } from 'src/app/services/api-client.service';
import { Animation, AnimationController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  QrComponent, MiclaseComponent, ForoComponent, MisdatosComponent,AdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioPage implements OnInit {

  @ViewChild('fileinput', { static: false })
  private fileinput!: ElementRef;

  @ViewChild('video', { static: false })
  private video!: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas!: ElementRef;

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef, static: true}) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef, static: true}) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef, static: true}) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef, static: true}) itemFechaNacimiento!: ElementRef;

  usuario = new Usuario();
  
  soyAdmin = false;

  componente_actual = 'qr';

  constructor(
    private loadingController: LoadingController,
    private activeroute: ActivatedRoute,
    private router: Router,
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: ApiClientService,
    private animationController: AnimationController) { }

  ngOnInit() {
    this.authService.primerInicioSesion.subscribe(esPrimerInicioSesion => {
      this.componente_actual = 'qr';
      this.bd.datosQR.next('');
    });
      this.authService.usuarioAutenticado.subscribe((usuario) => {
        this.usuario = usuario? usuario : new Usuario();
      }); 
      console.log(this.usuario)
      this.comprobarAdmin()
      console.log(this.soyAdmin)

  }

  actualizarYRedirigir() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/inicio'])
    );
    
    window.location.href = url;
  }

  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .duration(2000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('transform', 'scale(0)', 'scale(1)');
    animation.play();
    }

  comprobarAdmin(){
    if (this.usuario.nombre == "admin") {this.soyAdmin=true} 
    else this.soyAdmin=false 
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (nombreComponente === 'foro') this.api.cargarPublicaciones();
    if (nombreComponente === 'misdatos') this.authService.leerUsuarioAutenticado();
  }

  public animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
