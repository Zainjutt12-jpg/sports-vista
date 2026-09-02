export default class CreateUserResDto {
    userId : number;
    username: string;
    email: string;
    areaId?: number;
    createTime: Date;
    phoneNumber:string;
    teamId?:number
}


export class loginResponse {
    password : string;
    email:string;
}