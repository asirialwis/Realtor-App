import { Injectable } from '@nestjs/common';
import { Home, PropertyType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';

@Injectable()
export class HomeService {

    constructor( private readonly prismaService:PrismaService) {}

    async getHomes():Promise<HomeResponseDto[]>{
        const homes = await this.prismaService.home.findMany({
            select:{
                id:true,
                address:true,
                city:true,
                number_of_bedrooms:true,
                number_of_bathrooms:true,
                listed_date:true,
                price:true,
                land_size:true,
                propertyType:true,
                images:{
                    select:{
                        id:true,
                        url:true
                    }
                }
            },
            // where:{
            //     city:'Toronto',
            //     price:{
            //         gte:100000,
            //         lte:200000
            //     },
            //     propertyType:PropertyType.RESIDENTIAL
            // }


        });
        return homes.map((home)=> new HomeResponseDto(home));
    }
}
