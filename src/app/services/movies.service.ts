/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private popularesPage = 0;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  generos: any[] = [];

  constructor(private http: HttpClient) {}
  getFeature() {
    const today = new Date();
    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    let monthString;
    const month = today.getMonth() + 1;

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    //SIRVE PARA CREAR LAS FECHAS EN STRINGY USARLAS EN EL QUERY
    const start = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.http.get<RespuestaMDB>(
      `${environment.url}/discover/movie?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&primary_release_year=2015&primary_release_date.gte=2015&primary_release_date.lte=2022&with_watch_monetization_types=flatrate`
    );
  }
  getPopular() {
    this.popularesPage++;
    return this.http.get<RespuestaMDB>(
      `${environment.url}/movie/popular?api_key=${environment.apiKey}&language=es&page=${this.popularesPage}`
    );
  }

  getPeliDetalle(id: string) {
    const path = this.http.get<PeliculaDetalle>(
      `${environment.url}/movie/${id}?api_key=${environment.apiKey}&language=es&page=${this.popularesPage}`
    );
    return path;
  }
  getActores(id: string) {
    return this.http.get<RespuestaCredits>(
      `${environment.url}/movie/${id}/credits?api_key=${environment.apiKey}&language=es&page=${this.popularesPage}`
    );
  }

  getBusqueda(movie: string) {
    const path = this.http.get<PeliculaDetalle>(
      `${environment.url}/search/movie/?api_key=${environment.apiKey}&query=${movie}&language=en-US&page=1&include_adult=true`
    );
    return path;
  }

  private executeQuery<T>(query: string) {
    query = environment.url + query;
    query += `&api_key=${environment.apiKey}&language=en&include_image_language=es`;

    return this.http.get(query);
  }
}
