import { Component, Input, OnInit } from '@angular/core';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  fav = 'heart-outline';

  slidesOptActores = {
    slidesPerView: 2.05,
    freeMode: true,
    spaceBetween: -4,
  };

  constructor(
    private movieService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) {}

  ngOnInit() {

  this.dataLocal
    .existePelicula(this.id)
    .then((existe) => (this.fav = (existe) ? 'heart' : 'heart-outline'));

    this.movieService.getPeliDetalle(this.id).subscribe((resp) => {
      console.log(resp);
      this.pelicula = resp;
    });
    this.movieService.getActores(this.id).subscribe((resp) => {
      console.log(resp);
      this.actores = resp.cast;
    });
  }
  regresar() {
    this.modalCtrl.dismiss();
  }
  favorito() {
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.fav = (existe) ? 'heart' : 'heart-outline';
  }
}
