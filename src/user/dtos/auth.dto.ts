import { IsString, IsNotEmpty , IsEmail, MinLength , Matches} from "class-validator";

export class SignupDto{
    @IsNotEmpty()
    @IsString()
    name:string; 

    @Matches(/^(?:0(?:7[1-8]\d|11|2[0-578]\d|3[0-578]\d|4[0-578]\d|5[0-8]\d|6[0-578]\d|8[0-3578]\d|9[0-3589]\d)\d{6})$/ , {message:'phone must be a valid number'})
    phone:string;

    @IsEmail()
    email:string;

    @MinLength(5)
    @IsString()
    password:string;

    
 }

export class SigninDto{

    @IsEmail()
    email:string;

    @IsString()
    password:string;
 }