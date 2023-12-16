import { Component, OnInit } from '@angular/core';
import { PokeapiService } from './pokeapi.service';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.page.html',
  styleUrls: ['./pokemon-card.page.scss'],
})
export class PokemonCardPage implements OnInit {

  public pokemons:any = [];
  public allpokemon:any = [];
  list = [6,10,11,13]
  constructor( private Servicio: PokeapiService ) { }
  
  //aqui tengo que importar el servicio de consumo de la api para poder mostrarlo por lista.
  
  //metodo que genera un numero random;
  numberRandom = (min:number ,max:number) =>{
    return Math.floor(Math.random() * (max - min)) + 1;
  }

  ngOnInit(): void {
    try {

      this.pokemons = this.Servicio.getAllPokemons(this.list);
      


      // this.Servicio.getFirePokemons().subscribe(data => {
      //   let pokemon:any = data[this.numberRandom(0,data.length)];
      //   this.Servicio.getPokemon(pokemon.id).subscribe(result=>{
      //     pokemon.imagen = result.sprites.front_default;
      //     this.pokemons.push(pokemon)
      //   })
      // })
    
      // this.Servicio.getElectricPokemons().subscribe(data=>{
      //   let pokemon:any = data[this.numberRandom(0,data.length)];
      //   this.Servicio.getPokemon(pokemon.id).subscribe(result=>{
      //     pokemon.imagen = result.sprites.front_default;  
      //     this.pokemons.push(pokemon)
      //   })
      // })

      // this.Servicio.getWaterPokemons().subscribe(data=>{
      //   let pokemon:any = data[this.numberRandom(0,data.length)];
      //   this.Servicio.getPokemon(pokemon.id).subscribe(result=>{
      //     pokemon.imagen = result.sprites.front_default;
      //     // this.pokemons = this.Servicio.addPokemon(pokemon);
      //     this.pokemons.push(pokemon)
      //   })
      // })


      // this.Servicio.getRockPokemons().subscribe(data=>{
      //   let pokemon:any = data[this.numberRandom(0,data.length)];
      //   this.Servicio.getPokemon(pokemon.id).subscribe(result=>{
      //     pokemon.imagen = result.sprites.front_default;
      //     // this.pokemons = this.Servicio.addPokemon(pokemon);
      //     this.pokemons.push(pokemon)
      //   })
      // })
      
    } catch (error) {
      console.log('Ah ocurrido un error al obtener los datos',error);
    }

  }

}


type pokemon  = {
  id:number,
  name:string,
  image:string
}