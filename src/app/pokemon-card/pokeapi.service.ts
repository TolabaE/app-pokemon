import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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
      tipo:"Rock"
    },
    {
      id:10,
      tipo:"Fire"
    },
    {
      id:11,
      tipo:"Water"
    },
    {
      id:13,
      tipo:"Electric"
    }
  ]

  getTypePokemons(type: TypePokemon){    
    return this.http.get<any>(this.baseUrl + `type/${type}`).pipe(map( x =>  {
      let res = x.pokemon.map((x:any) => {
        let str = x.pokemon.url;
        let idx = str.indexOf('pokemon/') + 8;
        str = str.slice(idx);
        let id = str.slice(0, -1);
        return { id : id , name : x.pokemon.name }
      });
      return res as {id:number, name:string} [];
    }));
  }
  
  //metodo que genera un numero random;
  numberRandom = (min:number,max:number) =>{
    return Math.floor(Math.random() * (max - min)) + 1;
  }

  //este metodo recorre una lista de id, que ejecuta el metodo getTypePokemons por cada id que valla pasando.
  getAllPokemons (ids:number[]){
    ids.forEach( x =>{
      this.getTypePokemons(x).subscribe(data=>{
        let randomPokemon:any = data[this.numberRandom(0,data.length)];//obtengo la posicion de un pokemon de acuerdo a la longitud del arreglo
        this.getPokemon(randomPokemon.id).subscribe(infoPokemon => {
          randomPokemon.category = this.categorys.find(item => item.id == x )?.tipo;//obtengo la categoria a la que pertence en pokemon.
          randomPokemon.imagen = infoPokemon.sprites.front_default;
          this.listaPokemons.push(randomPokemon);
        })        
      })
    })
    return this.listaPokemons;
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

enum TypePokemon {
  Fire = 10,
  Electric = 13,
  Rock = 6,
  Water = 11
}

interface category {
  id:number,
  tipo:string
}