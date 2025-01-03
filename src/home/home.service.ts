import { Injectable, NotFoundException } from '@nestjs/common';
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

interface CreateHomeParams {
  address: string;
  city: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  price: number;
  landSize: number;
  propertyType: PropertyType;
  images: {
    url: string;
  }[];
}

interface UpdateHomeParams {
  address?: string;
  city?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  price?: number;
  landSize?: number;
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






  
  async createHome({
    address,
    city,
    numberOfBathrooms,
    numberOfBedrooms,
    landSize,
    price,
    propertyType,
    images,
  }: CreateHomeParams) {
    const home = await this.prismaService.home.create({
      data: {
        address,
        number_of_bathrooms: numberOfBathrooms,
        number_of_bedrooms: numberOfBedrooms,
        city,
        land_size: landSize,
        price,
        propertyType,
        realtor_id: 9,
      },
    });

    const homeImages = images.map((image) => {
      return { ...image, home_id: home.id };
    });

    await this.prismaService.image.createMany({
      data: homeImages,
    });
    return new HomeResponseDto(home);
  }




  async updateHomeById(data: UpdateHomeParams, id: number) {
    const home = await this.prismaService.home.findUnique({
      where: { id },
    
    });

    if (!home) {
      throw new NotFoundException('Home not found');
    }

    const updatedHome = await this.prismaService.home.update({
      where: { id },
      data,
    });

    return new HomeResponseDto(updatedHome);
  }
}
