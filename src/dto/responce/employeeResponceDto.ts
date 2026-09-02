export default class EmployeeResponceDto{
    employeeId: number;
    employeeName: string;
    address: string;
    phone: string;
    employmentType: string;
    salary: number;
    cnic: string;
    arenaId: number;
    arenaName: string;
    vendorId: number;
    vendorName: string;
    email: string;
}

export class LoginEmployeeResponseDto {
    employeeId : number;
    username: string;
    email: string;
    arenaId: number;
    vendorId: number;
    phoneNumber:string;
}
