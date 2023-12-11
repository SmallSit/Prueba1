  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { IonicModule } from '@ionic/angular';
  import { DataBaseService } from 'src/app/services/data-base.service'; 
  import { SqliteService } from 'src/app/services/sqlite.service';
  import { NavigationExtras } from '@angular/router';
  import { Router } from '@angular/router';
  import { Usuario } from 'src/app/model/usuario';

  @Component({
    selector: 'app-correo',
    templateUrl: './correo.page.html',
    styleUrls: ['./correo.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
  })
  export class CorreoPage implements OnInit {
    correo ='';

    constructor(private router: Router, private bd: DataBaseService) { }

    async ngOnInit() {
      
    }

    public irPaginaIngreso(): void {
      this.router.navigate(['/ingreso']);
    }

    async validarCorreoParaRespuesta() {
      const usuario = await this.bd.validarUsuarioPorCorreo(this.correo);
      
      if (usuario) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usuario
          }
        };

        this.router.navigate(['/pregunta'], navigationExtras);
      } else {
        this.router.navigate(['incorrecto']);
      }
    }

  }
