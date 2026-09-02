import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export default class EmployeeRequestDto {

    @IsNumber()
    @IsNotEmpty()
    vendorId: number;
   
    @IsNumber()
    @IsOptional()
    arenaId: number;

    @IsNumber()
    @IsOptional()
    employeeId: number;
    
    @Min(1)
    @IsPositive()
    @IsNumber()
    @IsOptional()
    page: number;

    @Min(1)
    @IsPositive()
    @IsNumber()
    @IsOptional()
    pageSize: number;
}

export class EmployeeRequestCreate{

    @IsString()
    @IsNotEmpty()
    employeeName: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    employmentType: string;
    
    @IsString()
    @IsNotEmpty()
    salary: string;

    @IsString()
    @IsNotEmpty()
    cnic: string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    arenaId: number;

    @IsNumber()
    @IsNotEmpty()
    vendorId: number;

}

export class EmployeeRequestUpdate{

    @IsString()
    @IsNotEmpty()
    employeeName: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    employmentType: string;
    
    @IsString()
    @IsNotEmpty()
    salary: string;

    @IsString()
    @IsNotEmpty()
    cnic: string;

    @IsNumber()
    @IsNotEmpty()
    arenaId: number;

}

export class EmployeeLoginRequest{

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}