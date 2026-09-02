import { IsNotEmpty, IsEmail, MaxLength, IsInt, IsOptional } from 'class-validator';


export default class workerRequestDtos {
    @IsNotEmpty()
    @MaxLength(255)
     workerName:string

     @IsNotEmpty()
     @IsEmail()
     @MaxLength(255)
     email: string;
 
     @IsNotEmpty()
     @MaxLength(255)
     password: string;
 
     @IsOptional()
     @IsInt()
     vendorId: number;
 
     @IsOptional()
     workerDescription?: string; 
 
}