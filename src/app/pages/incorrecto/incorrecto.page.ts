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
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IncorrectoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public irPaginaIngreso(): void {
    this.router.navigate(['/ingreso']);
  }
}
