import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  peliculasTop: Pelicula[] = [];
  peliculasPopular: Pelicula[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getFeature().subscribe((resp) => {
      this.peliculasTop = resp.results;
    });
    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopular().subscribe((resp) => {
      const arrTemp = [...this.peliculasPopular,...resp.results];
      this.peliculasPopular = arrTemp;
    });
  }
}
