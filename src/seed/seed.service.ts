import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter;
  ){}

  async executeSeed(){
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, pokemonNumber: number }[] =[];

    data.results.forEach(async({ name, url }) => {
      const segments = url.split('/');
      const pokemonNumber = +segments[segments.length - 2];
      const pokemon = await this.pokemonModel.create({ name, pokemonNumber});
      pokemonToInsert.push({ name, pokemonNumber});
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    
    return data.results;
  }
}
