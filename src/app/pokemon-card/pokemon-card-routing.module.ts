import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonCardPage } from './pokemon-card.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonCardPage
  },
  {
    path: ':pokemonID',//esta es la ruta para acceder a la carta de detalle.
    loadChildren: () => import('./detail-card/detail-card.module').then( m => m.DetailCardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonCardPageRoutingModule {}
