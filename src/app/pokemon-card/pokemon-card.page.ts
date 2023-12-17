import { Component, OnInit } from '@angular/core';
import { PokeapiService } from './pokeapi.service';
import { item } from '../types';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.page.html',
  styleUrls: ['./pokemon-card.page.scss'],
})
export class PokemonCardPage implements OnInit {

  public pokemons:item[] = [];

  list:number[] = [6,10,11,13];//lista de numeros con la categoria de id;

  constructor( private Servicio: PokeapiService ) { }
  
  ngOnInit(): void {
    try {

      this.pokemons = this.Servicio.getAllPokemons(this.list);
      
    } catch (error) {
      console.log('Ah ocurrido un error al obtener los datos',error);
    }
  }
}

