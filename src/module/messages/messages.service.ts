import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { MessageCreate } from './dtos/message-create.dto';
import { Message } from './entities/message';
import { MessageUpdate } from './dtos/message-update.dto';
import axios from 'axios';


@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService){}

    async create(data: MessageCreate): Promise<Message>{
        try{
            const response = await axios.get(`http://localhost:3001/user/get-by-username/${data.user}`);

            if(response.data)
                return await this.prisma.message.create({data});
                
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
           
        }
        catch {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }
    }
    
    async getAllMessages():Promise<Message[]>{
        return await this.prisma.message.findMany({include: {responses: {}}});
    }

    async get(id: string):Promise<Message>{
        return await this.prisma.message.findUnique({where:{id}});
    }

    async getBySubject(subject: string):Promise<Message[]>{
        return await this.prisma.message.findMany({where:{subject}});
    }

    async getByUser(username: string):Promise<Message[]>{
        return await this.prisma.message.findMany({where:{user: username}});
    }

    async update(id: string, data: MessageUpdate):Promise<Message>{

        const foundMessage = await this.prisma.message.findUnique({where:{id}})

        if(!foundMessage)
            throw new HttpException('Mensagem não encontrada', HttpStatus.NOT_FOUND);

        const updatedMessage = await this.prisma.message.update({
            data: {
                ...data,
                updatedAt: new Date()
            }, 
            where:{id}
        });

        return updatedMessage;

    }

    async updateUsername(username: string, newUsername: string){

        const updatedMessage = await this.prisma.message.updateMany({
            data: {
                user: newUsername,
                updatedAt: new Date()
            }, 
            where:{user: username}
        });

        return updatedMessage;

    }

    async delete(id: string): Promise<Message>{
        const foundMessage = await this.prisma.message.findUnique({where: {id}});

        if(!foundMessage)
            throw new HttpException('Mensagem não encontrada', HttpStatus.NOT_FOUND);

        return await this.prisma.message.delete({where:{id}});
    }
}
