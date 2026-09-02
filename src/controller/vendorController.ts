import Response from "../common/responce/Responce";
import { Body, Get, HttpCode, JsonController, Post,Put,Param, UseBefore, QueryParams, Patch } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { StatusCodes } from "http-status-codes";
import CreateVendorDto , {BankLookupRequestDto, updateVendorDtos, UpdateVendorInfoDto} from "../dto/request/vendorRequest";
import VendorInfoService from "../service/vendorService";
import vendorResponse from "../dto/responce/vendorResponseDto";
import { jwtAuthMiddleware } from "../config/authiddleware";
import { ForgetPassword } from "../dto/request/userRequest";

@JsonController('/vendors')
export default class VendorController {

    private vendorService: VendorInfoService = new VendorInfoService();

    @OpenAPI({
        description: 'Add Vendor',
        summary: 'Create a new Vendor'
    })
    @HttpCode(StatusCodes.CREATED)
    @Post('/add-vendor')
    async addVendor(@Body({ validate: true }) request: CreateVendorDto): Promise<Response<any>> {
        return await this.vendorService.addVendor(request);
    }


    @OpenAPI({
        description: 'Get Vendors',
        summary: 'Get a list of vendors'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/list')
    async getVendors(): Promise<Response<vendorResponse[]>> {
        return await this.vendorService.getVendors();
    }

    @OpenAPI({
        description: 'Update Vendor',
        summary: 'Update a previous vendor'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Put('/update-vendor/:vendorId')
    async updateVendor(@Param('vendorId') vendorId: number, @Body() updateVendorDto: updateVendorDtos) {
        return await this.vendorService.updateVendor(vendorId, updateVendorDto);
    }

    @OpenAPI({
        description: 'Update Vendor Profile Settings',
        summary: 'Update a previous vendor profile'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Put('/update-profile-setting/:vendorId')
    async updateVendorProfileInfo(@Param('vendorId') vendorId: number, @Body() updateVendorDto: UpdateVendorInfoDto) {
        return await this.vendorService.updateVendorProfileInfo(vendorId, updateVendorDto);
    }

    @OpenAPI({
        description: 'Vendor Login',
        summary: 'Authenticate vendor and return JWT token'
    })
    @HttpCode(StatusCodes.OK)
    @Post('/login')
    async loginVendor(@Body() loginDto: { email: string, password: string }): Promise<Response<any>> {
        return await this.vendorService.loginVendor(loginDto.email, loginDto.password);
    }

    @OpenAPI({
        description: 'Banks List',
        summary: 'Get Banks Lookup List'
    })
    @HttpCode(StatusCodes.OK)
    @Get('/bank/lookup')
    async getBanksLookup(@QueryParams() query: BankLookupRequestDto): Promise<Response<any>> {
        return await this.vendorService.getBanksLookup(
            query?.bankId
        );
    }

    @OpenAPI({
        description: 'Change Password',
        summary: 'Change Vendor Password'
    })
    @HttpCode(StatusCodes.OK)
    @Patch('/forget-password')
    async forgetPassword(@Body() request:ForgetPassword): Promise<Response<any>> {
        return await this.vendorService.forgetThePassword(request);
    }

}