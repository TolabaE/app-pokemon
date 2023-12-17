import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { arrayPokemons,category,TypePokemon } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private readonly baseUrl = "https://pokeapi.co/api/v2/";

  listaPokemons:any = []
  constructor(
    private http:HttpClient
  ) { }

  /**
   * Obtiene listado de pokemons segun el tipo
   *
   * @param {TypePokemon} type
   * @return {*}
   * @memberof PokeapiService
   */


  categorys: Array<category> = [
    {
      id:6,
      tipo:"Roca"
    },
    {
      id:10,
      tipo:"Fuego"
    },
    {
      id:11,
      tipo:"Agua"
    },
    {
      id:13,
      tipo:"Electrico"
    }
  ]

  getTypePokemons(type: TypePokemon){    
    return this.http.get<arrayPokemons>(this.baseUrl + `type/${type}`).pipe(map( data =>  {
      let res = data.pokemon.map((x) => {
        let str = x.pokemon.url;
        let idx = str.indexOf('pokemon/') + 8;
        str = str.slice(idx);
        let id = parseInt(str.slice(0, -1));//quito la barrita        
        return { id : id , name : x.pokemon.name }
      });
      return res ;
    }));
  }
  
  //metodo que genera un numero random;
  numberRandom = (max:number) =>{
    return Math.floor(Math.random() * max);
  }


  //este metodo recorre una lista de id, que ejecuta el metodo getTypePokemons por cada id que valla pasando.
  getAllPokemons (ids:number[]){
    ids.forEach( x =>{
      this.getTypePokemons(x).subscribe(data=>{
        let randomPokemon = data[this.numberRandom(data.length)];//obtengo la posicion de un pokemon de acuerdo a la longitud del arreglo
        this.getPokemon(randomPokemon.id).subscribe(infoPokemon => {
            this.categorys.find(item =>{
              if (item.id == x ) {
                Object.assign(randomPokemon, { category: item.tipo});
              }
          });//obtengo la categoria a la que pertence en pokemon.
          Object.assign(randomPokemon, { imagen: infoPokemon.sprites.front_default});//es un metodo del object que asigna una nueva propiedad a un objeto
          this.listaPokemons.push(randomPokemon);
        })        
      })
    })
    return this.listaPokemons;//retorna la lista de 4 pokemones de distintos tipos.
  }


  // getFirePokemons(){
  //   return this.getTypePokemons(TypePokemon.Fire);
  // }
  
  // getElectricPokemons(){
  //   return this.getTypePokemons(TypePokemon.Electric);
  // }

  // getRockPokemons(){
  //   return this.getTypePokemons(TypePokemon.Rock);
  // }

  // getWaterPokemons(){
  //   return this.getTypePokemons(TypePokemon.Water);
  // }

  //obtengo el pokemons de acuerdo al id ingresado.
  getPokemon(id : number){
    return this.http.get<any>(this.baseUrl+`pokemon/${id}`);
  }
}

