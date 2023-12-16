import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.page.html',
  styleUrls: ['./detail-card.page.scss'],
})
export class DetailCardPage implements OnInit {

  pokemones = [
    {
      id:1,
      nombre:"pikachu",
      estado:"solido",
      imagen:"https://www.shutterstock.com/image-vector/cute-adorable-vector-illustration-creature-260nw-2313970711.jpg"
    }
  ]

  constructor() { }

  ngOnInit() {
    console.log(this.pokemones);
    
  }

}
