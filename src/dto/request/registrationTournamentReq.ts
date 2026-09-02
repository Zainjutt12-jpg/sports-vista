import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";


export default class RegistrationTeamsReq {
    @IsNumber()
    teamId:number

    @IsNumber()
    tournamentId:number

    @IsBoolean()
    feesPaid:boolean
     
}

export class RegistrationAndInvoices{
    
    @IsNumber()
    teamId:number

    @IsNumber()
    tournamentId:number

    @IsBoolean()
    feesPaid:boolean

    @IsString()
    invoiceNumber: string; 
  
    @IsInt()
    invoiceAmount: number;
    
    @IsBoolean()
    @IsOptional()
    isAdvance?: boolean; 
  
    @IsBoolean()
    @IsOptional()
    isBook?: boolean; 
  
    @IsBoolean()
    @IsOptional()
    isTournament?: boolean; 
  
    @IsBoolean()
    @IsOptional()
    isTeamRegistration?: boolean; 
  
    @IsBoolean()
    @IsOptional()
    isOnetoOneMatch?: boolean; 
  
    @IsString()
    @IsOptional()
    createdBy?: string; 


}

export class registrationTeamsTournamentReq{
    @IsNumber()
    @IsNotEmpty()
    tournamentId:number


}

