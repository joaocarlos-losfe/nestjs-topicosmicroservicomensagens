import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponseCreate } from './dtos/response-create.dto';
import { ResponseUpdate } from './dtos/response-update.dto';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post("/")
  async create(@Body() data: ResponseCreate){

    return await this.responsesService.create(data);
  }

  @Get("/")
  async getAll(){

    return this.responsesService.getAll()
  }

  @Get("/:id")
  async get(@Param("id") id: string){

    return this.responsesService.get(id);
  }

  @Get("/get-by-username/:username")
  async getByUser(@Param("username") username: string){

    return await this.responsesService.getByUser(username)
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: ResponseUpdate){

    return await this.responsesService.update(id, data);
  }

  @Put("/:username/:newusername")
  async updateUserName(@Param("username") username: string, @Param("newusername") newUsername: string){
    
    return await this.responsesService.updateUsername(username, newUsername);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string){

    return await this.responsesService.delete(id);
  }
  
}
