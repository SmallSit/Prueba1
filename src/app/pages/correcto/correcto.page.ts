import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class CorrectoPage implements OnInit {

  datoRecibido: string = '';
  usuario: Usuario = new Usuario();

  constructor(private route: ActivatedRoute, private router:Router) { 
  }

  ngOnInit() {
    const navigationState = this.route.paramMap.subscribe(params => {
      const state = history.state;
      this.usuario = state['usuario'];
    });
  }

  public irPaginaIngreso(): void {
    this.router.navigate(['/ingreso']);
  }
}

