import Response from "../common/responce/Responce";
import { StatusCodes } from "http-status-codes";
import { Body, Get, HttpCode, JsonController, Param, Post, Put, QueryParams } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import VendorAccountService from "../service/vendorAccountService";
import { CreateVendorAccountRequestDto, GetVendorRequestDto, UpdateVendorAccountRequestDto } from "../dto/request/vendorAccountRequestDto";

@JsonController('/vendor-account')
export default class VendorAccountController {

    private vendorAccountService: VendorAccountService = new VendorAccountService();

    @OpenAPI({
        description: 'Update Vendor Bank Account',
        summary: 'Update Vendor Bank Account'
    })
    @HttpCode(StatusCodes.OK)
    @Put('/:vendorAccountId')
    async updateVendorBankAccount(@Param('vendorAccountId') vendorAccountId: number , @Body({ validate: true }) request: UpdateVendorAccountRequestDto): Promise<Response<any>> {
        return await this.vendorAccountService.updateVendorBankAccount(vendorAccountId , request);
    }

    @OpenAPI({
        description: 'Update Vendor Bank Account',
        summary: 'Update Vendor Bank Account'
    })
    @HttpCode(StatusCodes.OK)
    @Get('')
    async getVendorBankAccount(@QueryParams() query: GetVendorRequestDto): Promise<Response<any>> {
        return await this.vendorAccountService.getAccountsListByCriteria(query?.page , query?.pageSize , query?.vendorId);
    }

}