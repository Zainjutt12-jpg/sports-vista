import { IsNotEmpty, IsInt, IsEmail, MaxLength, IsArray, IsDateString, IsNumber, isNotEmpty, isNumber, IsString } from 'class-validator';

export default  class teamPostDto{
    @IsNotEmpty()
    @IsString()
    teamName:string

    @IsNotEmpty()
    @IsString()
    teamLogo:string

    @IsNotEmpty()
    @IsString()
    teamDesc:string

    @IsNotEmpty()
    @IsString()
    player1:string

    @IsNotEmpty()
    @IsString()
    player2:string

    @IsNotEmpty()
    @IsString()
    player3:string

    @IsNotEmpty()
    @IsString()
    player4:string

    @IsNotEmpty()
    @IsString()
    player5:string

    @IsNotEmpty()
    @IsString()
    player6:string

    @IsNotEmpty()
    @IsString()
    player7:string

    @IsNotEmpty()
    @IsString()
    createdBy:string

    @IsNotEmpty()
    @IsNumber()
    createdById:number
}


export   class teamPutDto{

    @IsNotEmpty()
    @IsNumber()
    teamId:number

    @IsNotEmpty()
    @IsString()
    teamName:string

    @IsNotEmpty()
    @IsString()
    teamLogo:string

    @IsNotEmpty()
    @IsString()
    teamDesc:string

    @IsNotEmpty()
    @IsString()
    player1:string

    @IsNotEmpty()
    @IsString()
    player2:string

    @IsNotEmpty()
    @IsString()
    player3:string

    @IsNotEmpty()
    @IsString()
    player4:string

    @IsNotEmpty()
    @IsString()
    player5:string

    @IsNotEmpty()
    @IsString()
    player6:string

    @IsNotEmpty()
    @IsString()
    player7:string

    @IsNotEmpty()
    @IsString()
    createdBy:string

    @IsNotEmpty()
    @IsNumber()
    createdById:number
}

