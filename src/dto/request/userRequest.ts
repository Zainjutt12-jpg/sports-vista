import { IsNotEmpty, IsEmail, MaxLength, IsInt, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export default class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(16)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsNotEmpty()
    @MaxLength(32)
    password: string;

    @IsOptional()
    @IsInt()
    areaId?: number;

    @IsOptional()
    @MaxLength(20)
    phoneNumber?: string;
}
export class UpdateUserDto {
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @MaxLength(16)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsNotEmpty()
    @MaxLength(32)
    password: string;

    @IsOptional()
    @IsInt()
    areaId?: number;

    @IsOptional()
    @MaxLength(20)
    phoneNumber?: string;
}


export class loginDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsNotEmpty()
    @MaxLength(32)
    password: string;


}

export class ForgetPassword{
    @IsString()
    @IsEmail()
    @IsOptional()
    email:string;

    @IsString()
    @IsOptional()
    phoneNumber:string;

    @IsString()
    @IsOptional()
    password:string;

}