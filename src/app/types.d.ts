export type detalle = {
    picture:string,
    name:string,
    height:number,
    weight:number,
    experience:number
}

export type response = {
    name:string,
    height:number,
    weight:number,
    base_experience:number
    sprites:{
        front_default:string
    },
}

export type item = {
    id:number,
    name:string,
    imagen:string,
    category:string
}
export enum TypePokemon {
    Fire = 10,
    Electric = 13,
    Rock = 6,
    Water = 11
}

export interface category {
    id:number,
    tipo:string
}

export interface arrayPokemons{
    pokemon:pokemones[]
}

export type pokemones = {
    pokemon:{
        name:string,
        url:string
    }
    slot:number
}