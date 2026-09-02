import { Body, Get, HttpCode, JsonController, Post,Put,Param, UseBefore, Patch } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { StatusCodes } from "http-status-codes";
import CreateUserDto , {loginDto, UpdateUserDto, ForgetPassword} from "../dto/request/userRequest";
// import UserInfoResponceDto from "../dto/response/userInfoResponceDto";
import CreateUserResDto, { loginResponse } from "../dto/responce/userResponseDto";
import UserInfoWriteService from "../service/userService";
import Response from "../common/responce/Responce";
import { jwtAuthMiddleware } from "../config/authiddleware";
import { request } from "express";

@JsonController('/users')
export default class UserController {  

    private userService: UserInfoWriteService = new UserInfoWriteService();

    @OpenAPI({
        description: 'Add User',
        summary: 'Create a new user'
    })
    @HttpCode(StatusCodes.CREATED)
    @Post('/add-user')
    async addUser(@Body({ validate: true }) request: CreateUserDto): Promise<Response<any>> {
        return await this.userService.addUser(request);
    }

    @OpenAPI({
        description: 'Update User',
        summary: 'Update a previous user'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Put('/update-user/:userId')
    async updateUser(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(userId, updateUserDto);
    }



    @OpenAPI({
        description: 'Get Users',
        summary: 'Get a list of users'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/list')
    async getUsers(): Promise<Response<CreateUserResDto[]>> {
        return await this.userService.getUsers();
    }

    @OpenAPI({
        description: 'Lookup User by ID',
        summary: 'Get user details by userId'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/lookup-user/:userId')
    async lookupUser(@Param('userId') userId: number): Promise<Response<CreateUserResDto>> {
        return await this.userService.lookupUser(userId);
    }
    @OpenAPI({
        description: 'User Login',
        summary: 'Authenticate user and return JWT token'
    })
    @HttpCode(StatusCodes.OK)
    @Post('/login')
    async loginUser(@Body() request:loginDto): Promise<Response<any>> {
    return await this.userService.loginUser(request.email, request.password);
    }



    @OpenAPI({
        description: 'Change Password',
        summary: 'Change Users Password'
    })
    @HttpCode(StatusCodes.OK)
    @Patch('/forget-password')
    async forgetPassword(@Body() request:ForgetPassword): Promise<Response<any>> {
    return await this.userService.forgetThePassword(request);
    }

}
