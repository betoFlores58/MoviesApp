import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';



@NgModule({
  entryComponents: [DetalleComponent],
  declarations: [
    SlideshowPosterComponent,
    SlideshowBackdropComponent,
    SlideshowParesComponent,
    DetalleComponent
  ],
  exports: [
    SlideshowPosterComponent,
    SlideshowBackdropComponent,
    SlideshowParesComponent,
    DetalleComponent
  ],
  imports: [CommonModule, IonicModule, PipesModule],
})
export class ComponentsModule {}
