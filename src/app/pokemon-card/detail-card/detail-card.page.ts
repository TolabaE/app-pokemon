import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from '../pokeapi.service';
import { response, detalle } from 'src/app/types';


@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.page.html',
  styleUrls: ['./detail-card.page.scss'],
})
export class DetailCardPage implements OnInit {

  public objeto:detalle = {
    picture:"",
    name:"",
    height:0,
    weight:0,
    experience:0
  }

  constructor(private activedRoute: ActivatedRoute, private servicios:PokeapiService) { }
  
  ngOnInit():void{

    this.activedRoute.paramMap.subscribe(result =>{
      let id = result.get('pokemonID');//recibo el id que me envian por parametro
      if(typeof id === "string"){
        this.servicios.getPokemon(parseInt(id)).subscribe( (data:response) =>{      
          this.objeto = {
            picture:data.sprites.front_default,
            name: data.name,
            height:data.height,
            weight:data.weight,
            experience: data.base_experience
          }
        })
      }
    })
  }
}

