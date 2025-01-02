import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResponseDto } from './dto/home.dto';

@Controller('home')
export class HomeController {

    constructor( private readonly homeService:HomeService ) {}

    @Get()
    getHomes():Promise<HomeResponseDto[]>{
        return this.homeService.getHomes();
    }
}
