import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Router } from '@angular/router';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true
})
export class AdminComponent  implements OnInit {public usuario:any = new Usuario();
  listaUsuarios: Usuario[] = [];
  constructor(private authService: AuthService, private bd: DataBaseService, private router: Router) { }

  async ngOnInit() {
    this.bd.listaUsuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
    });
    this.authService.leerUsuarioAutenticado().then((usuario) => {
      this.usuario = usuario;

      console.log("usuario ", this.usuario);
    })
    
  }
  eliminarUsuario(user:any){
    if(user=="admin@duocuc.cl"){
      showAlertDUOC("No se puede eliminar al administrador");
      return;
    } else{
      this.bd.eliminarUsuarioUsandoCorreo(user);
      showAlertDUOC("El usuario ha sido eliminado");
    }
  }
}

