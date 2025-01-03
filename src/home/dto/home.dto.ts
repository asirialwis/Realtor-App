import { PropertyType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsString , IsNotEmpty , IsNumber, IsArray, ValidateNested, IsEnum, IsOptional } from "class-validator";
import { Type } from 'class-transformer';


export class HomeResponseDto {
  'id': number;
  'address': string;

  @Exclude()
  'number_of_bedrooms': number;

  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }

  @Exclude()
  'number_of_bathrooms': number;

  @Expose({ name: 'numberOfBathrooms' })
  numberOfBathrooms() {
    return this.number_of_bathrooms;
  }

  'city': string;

  @Exclude()
  'listed_date': Date;

  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listed_date;
  }

  'price': number;

  @Exclude()
  'land_size': number;

  @Expose({ name: 'landSize' })
  landSize() {
    return this.land_size;
  }
  'propertyType': PropertyType;

  @Exclude()
  'created_at': Date;

  @Exclude()
  'updated_at': Date;

  @Exclude()
  'realtor_id': number;

  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }
}



class Image {
  @IsNotEmpty()
  @IsString()
  url: string;

 
}

export class CreateHomeDto {
    @IsNotEmpty() 
    @IsString()
    address: string;
  
    @IsNotEmpty()
    @IsNumber()
    numberOfBedrooms: number;
  
    @IsNotEmpty()
    @IsNumber()
    numberOfBathrooms: number;
  
    @IsNotEmpty()
    @IsString()
    city: string;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsNotEmpty()
    @IsNumber()
    landSize: number;
  
    @IsNotEmpty()
    @IsEnum(PropertyType)
    propertyType: PropertyType;
  
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Image)
    images: Image[];
  }


  export class UpdateHomeDto {
    @IsOptional()
    @IsNotEmpty() 
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    numberOfBedrooms?: number;
  
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    numberOfBathrooms?: number;
  
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    city?: string;
  
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    price?: number;
  
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    landSize?: number;
  
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(PropertyType)
    propertyType?: PropertyType;
  
     
  }
