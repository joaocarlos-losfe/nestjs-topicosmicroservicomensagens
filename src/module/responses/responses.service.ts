import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ResponseCreate } from './dtos/response-create.dto';
import axios from 'axios';
import { ResponseUpdate } from './dtos/response-update.dto';

//172.20.0.4

@Injectable()
export class ResponsesService {
    constructor(private prisma: PrismaService){}

    async create(data: ResponseCreate){
        try{
            const foundMessage = await this.prisma.message.findUnique({where: {id: data.messageId}})

            if(!foundMessage)
                throw new HttpException('Mensagem não encontrada', HttpStatus.NOT_FOUND);

            const response = await axios.get(`http://userapi:3001/user/get-by-username/${data.user}`);

            if(!response.data)
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

            return await this.prisma.response.create({data});
        }
        catch{
            throw new HttpException('Usuário não encontrado', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll(){
        return this.prisma.response.findMany({include:{
            message:{
                select:{
                    message: true,
                    user: true,
                    createdAt: true
                }
            }
        }});
    }

    async get(id: string){

        const response = await this.prisma.response.findUnique({where:{id}, 
            include:{
                message:{
                    select:{
                        message: true,
                        user: true,
                        createdAt: true
                    }
                }
        }});

        if(!response)
            throw new HttpException('Resposta não encontrada', HttpStatus.NOT_FOUND);
    
        return response;
    }

    async getByUser(username: string){

        const response = await this.prisma.response.findFirst({where: {user: username}, 
            include:{
                message:{
                    select:{
                        message: true,
                        user: true,
                        createdAt: true
                    }
                }
        }});

        if(!response)
            throw new HttpException('Nenhuma resposta encontrada para este usuário', HttpStatus.NOT_FOUND);

        return response;
    }

    async update(id: string, data: ResponseUpdate){
        const foundResponse = await this.prisma.response.findUnique({where:{id}});

        if(!foundResponse)
            throw new HttpException('Resposta não encontrada', HttpStatus.NOT_FOUND);

        return this.prisma.response.update({where:{id}, data:{...data, updatedAt: new Date()}})
    }

    async updateUsername(username: string, newUsername: string){

        const updatedResponse = await this.prisma.response.updateMany({
            data: {
                user: newUsername,
                updatedAt: new Date()
            }, 
            where:{user: username}
        });

        return updatedResponse;

    }

    async delete(id: string){
        const foundResponse = await this.prisma.response.findUnique({where:{id}});

        if(!foundResponse)
            throw new HttpException('Resposta não encontrada', HttpStatus.NOT_FOUND);

        return await this.prisma.response.delete({where:{id}})
    }

    
}
