import { Injectable, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.cargarFavs();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
    });
    await toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
      mensaje = 'Removido de favs';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregado a favs';
    }
    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;
  }

  async cargarFavs(){
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return peliculas;
  }

  async existePelicula(id){
    id = Number(id);

    await this.cargarFavs();
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe ? true : false);
  }
}
