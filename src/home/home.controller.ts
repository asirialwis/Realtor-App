import { Controller, Get, Post, Query , Body, Put, Param, ParseIntPipe } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './dto/home.dto';
import { PropertyType } from '@prisma/client';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeResponseDto[]> {


    const price = minPrice || maxPrice ?{
        ...(minPrice && {gte:parseFloat(minPrice)}),
        ...(maxPrice && {lte:parseFloat(maxPrice)})
    } : undefined;


    const filters={
        ...(city && {city}),
        ...(price && {price}),
        ...(propertyType && {propertyType})
    }

    return this.homeService.getHomes(filters);
  }

  @Post()
  createHome( @Body() body:CreateHomeDto){
    return this.homeService.createHome(body);
  }


  @Put(':id')
  updateHome(
    @Param('id',ParseIntPipe) id:number, @Body() body:UpdateHomeDto
  ){
    return this.homeService.updateHomeById(body,id);
  }


}
