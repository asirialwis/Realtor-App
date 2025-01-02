import { Injectable } from '@nestjs/common';
import { Home, PropertyType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from './dto/home.dto';

interface HomeFilters {
  city?: string;
  price?: {
    gte: number;
    lte: number;
  };
  propertyType?: PropertyType;
}

@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHomes(filters: HomeFilters): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      select: {
        id: true,
        address: true,
        city: true,
        number_of_bedrooms: true,
        number_of_bathrooms: true,
        listed_date: true,
        price: true,
        land_size: true,
        propertyType: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      where: filters,
    });
    
    return homes.map((home) => new HomeResponseDto(home));
  }
}
