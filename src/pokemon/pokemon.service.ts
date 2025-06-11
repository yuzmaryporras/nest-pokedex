import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
     createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try{

      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }catch(error){
       this.handlerExceptions(error);
    }
  }

findAll(paginationDto: paginationDto) {

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      pokemonNumber: 1
    })
    .select('-__v');
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

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if ( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    try{
      await pokemon.updateOne( updatePokemonDto );
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    }catch(error){
      this.handlerExceptions(error);
    }
   
  }

  async remove(id: string) {

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id});
    if( deletedCount === 0 ){
      throw new BadRequestException(`Pokwmon with id "${id} not found"`)
    }
    return;
  }

  private handlerExceptions( error: any ){
      const ALREADY_EXIST_BD = 11000;
      if(error.code === ALREADY_EXIST_BD) {
        throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException(`Can't create Pokemon - check server log`);
  }
}
