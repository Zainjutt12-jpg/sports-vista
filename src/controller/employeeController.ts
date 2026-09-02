import Response from "../common/responce/Responce";
import EmployeeRequestDto, { EmployeeLoginRequest, EmployeeRequestCreate, EmployeeRequestUpdate } from "../dto/request/employeeRequestDto";
import { StatusCodes } from "http-status-codes";
import { Body, Get, HttpCode, JsonController, Param, Post, Put, QueryParams, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import EmployeeService from "../service/employeeService";
import { jwtAuthMiddleware } from "../config/authiddleware";

@JsonController('/employee')
export default class EmployeeController{

    private employeeService = new EmployeeService();
    @OpenAPI({ 
        description: 'Get Nearest Arenas' , 
        summary: 'Get Employees Lookup' })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/employee-master')
    async getArenaMaster(@QueryParams() query: EmployeeRequestDto) : Promise<Response<any>> {
        return await this.employeeService.get_Employee_by_vendorId(
            query.arenaId,
            query.vendorId,
            query.employeeId,
            query?.page,
            query?.pageSize
        );
    }

    @OpenAPI({
        description: 'Add Employee Data',
        summary: 'Add Employees'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Post('/create')
    async addEmployees(@Body({validate: true}) request: EmployeeRequestCreate): Promise<Response<any>>{
        return this.employeeService.create_Employee_Master(request);  
    }

    @OpenAPI({
        description: 'Update Employee',
        summary: 'Update Employee to use by Worker'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Put('/update/:employeeId')
    async updateEmployee(@Body({validate: true}) request: EmployeeRequestUpdate , @Param("employeeId") employeeId: number): Promise<Response<any>> {
        return this.employeeService.update_Employee_Master(request , employeeId);
    }

    @OpenAPI({
        description: 'Login Employee',
        summary: 'Login Employee to use by Worker'
    })
    @HttpCode(StatusCodes.OK)
    @Post('/login')
    async loginEmployee(@Body({validate: true}) request: EmployeeLoginRequest ): Promise<Response<any>> {
        return this.employeeService.loginEmployee(
            request.email,
            request.password
        );
    }
    
}