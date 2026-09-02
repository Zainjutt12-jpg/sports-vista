import { EmployeeRequestCreate, EmployeeRequestUpdate } from "dto/request/employeeRequestDto";
import PageResponse from "../common/responce/PageResponce";
import Response from "../common/responce/Responce";
import EmployeeResponceDto, { LoginEmployeeResponseDto } from "../dto/responce/employeeResponceDto";
import EmployeeMapper from "../mapper/employeeMapper";
import { EmployeeRepository } from "../repository/employeeRepository";
import EmployeeEntity from "../entity/employeeEntity";
import { EntityManager } from "typeorm";
import { CREATED, Employee_Not_Found } from "../common/responce/StatusCode";
import * as jwt from 'jsonwebtoken';
import { validatePassword } from "../common/functions";

export default class EmployeeService {

    private employeeRepo = EmployeeRepository;

    async get_Employee_by_vendorId(arenaId: number , vendorId: number , employeeId: number , page: number = 1 , pageSize: number = 10) : Promise<Response<EmployeeResponceDto>>{
        let [data , total] : any[] = await this.employeeRepo.sarchEmployee(vendorId , arenaId , employeeId , page , pageSize);
        let arenaDto : EmployeeResponceDto[] = EmployeeMapper.lookupDto(data);
        let pagination: PageResponse = new PageResponse(pageSize , page , total)
        return new Response<any>(arenaDto , pagination);
    }

    async create_Employee_Master(request: EmployeeRequestCreate){
        let arena : EmployeeEntity;

        await this.employeeRepo.manager.transaction(async (entityManager: EntityManager) => {
            arena = EmployeeMapper.addEmployeeMaster(request);
            arena = await entityManager.save(arena);
        });
        return new Response<any>(CREATED);
    }

    async update_Employee_Master(request: EmployeeRequestUpdate , employeeId: any){
        let employee : EmployeeEntity;

        await this.employeeRepo?.manager.transaction(async (entityManager: EntityManager) => {
            employee = await this.employeeRepo.fetchupdateEmployeePatch(employeeId);
            employee.employeeName = request?.employeeName;
            employee.phone = request?.phone;
            employee.address = request?.address;
            employee.salary = Number(request?.salary);
            employee.employmentType = request?.employmentType;
            employee.cnic = request?.cnic;
            employee.arenaId = request?.arenaId;
            employee = await entityManager.save(employee);
        });
        if(!employee){
            return new Response<any>(Employee_Not_Found);
        }
        return new Response<any>(CREATED);
    }

    async loginEmployee(email: string, password: string): Promise<Response<any>> {
        const employee: EmployeeEntity = await this.employeeRepo.fetchEmployeeByEmail(email);

        if (!employee) {
            return new Response<any>({ message: 'Invalid Email!' });
        }

        if (!await validatePassword(employee.password , password)) {
            return new Response<any>({ message: 'Invalid Password!' });
        }

        const secretKey = 'mySportsVista0099!'; 

        const token = jwt.sign(
            { userId: employee.employeeId },
            secretKey,
            { expiresIn: '90d' } 
        );

        const employeeDto: LoginEmployeeResponseDto = {
            employeeId: employee.employeeId,
            username: employee.employeeName,
            email: employee.email,
            arenaId: employee.arenaId,
            vendorId: employee.vendorId,
            phoneNumber:employee.phone
        };

        return new Response<any>({ user: employeeDto, token }, CREATED.status);
    }

}