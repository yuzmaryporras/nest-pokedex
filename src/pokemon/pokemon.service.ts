import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
     createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try{

      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }catch(error){
      const ALREADY_EXIST_BD = 11000;
      if(error.code === ALREADY_EXIST_BD) {
        throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException(`Can't create Pokemon - check server log`);
    }
   
   
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({ pokemonNumber: term });
    }

    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()});
    }

    if(!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or pokemonNumber "${ term }" not found`);
    }
    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
