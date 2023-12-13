import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageCreate } from './dtos/message-create.dto';
import { MessageUpdate } from './dtos/message-update.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post("/")
  async create(@Body() data: MessageCreate){

    return await this.messagesService.create(data);
  }

  @Get("/")
  async getAllMessages(){

    return await this.messagesService.getAllMessages();
  }

  @Get("/:id")
  async get(@Param("id") id: string){

    return await this.messagesService.get(id);
  }

  @Get("/get-by-subject/:subject")
  async getBySubject(@Param("subject") subject: string){

    return await this.messagesService.getBySubject(subject);
  }

  @Get("/get-by-username/:username")
  async getByUser(@Param("username") username: string){

    return await this.messagesService.getByUser(username);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: MessageUpdate){

    return await this.messagesService.update(id, data);
  }

  @Put("/:username/:newusername")
  async updateUserName(@Param("username") username: string, @Param("newusername") newUsername: string){
    
    return await this.messagesService.updateUsername(username, newUsername);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string){

    return await this.messagesService.delete(id);
  }

  @Delete("/delete-all-messages-by-user/:username")
  async deleteAllMessagesByUser(@Param("username") username: string){
    return await this.messagesService.deleteAllMessagesByUser(username);
  }
}
