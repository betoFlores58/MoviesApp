import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = [
    'Spiderman',
    'Die Hard',
    'Gladiator',
    'Avengers',
    'Toy Story',
    'Terminator',
  ];

  constructor(private movieService: MoviesService, private modalCtrl: ModalController) {}

  buscar(event) {
    const valor = event.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;
    this.movieService.getBusqueda(valor).subscribe((resp) => {
      console.log(resp);
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  async verDetalle(id: number) {
    this.buscando = true;
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id,
      },
    });
    modal.present();
    this.buscando = false;
  }
}
