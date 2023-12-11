import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponseCreate } from './dtos/response-create.dto';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post("/")
  async create(@Body() data: ResponseCreate){
    return await this.responsesService.create(data);
  }

  
}
