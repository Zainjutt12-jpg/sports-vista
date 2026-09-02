import Response from "../common/responce/Responce";
import paymentTokenRequest , {InvoiceListRequestDto, PaymentTransactionRequest} from "../dto/request/paymentRequest";
import { StatusCodes } from "http-status-codes";
import { Body, Get, HttpCode, JsonController, Post, QueryParams, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { jwtAuthMiddleware } from "../config/authiddleware";
import PaymentWriteService from "../service/paymentService";
@JsonController('/payment')
export class PaymentController {

    private paymentService: PaymentWriteService = new PaymentWriteService();

    @OpenAPI({
        description: 'Get Payment Token',
        summary: 'Get the payment token'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Post()
    async addToken(@Body({validate: true}) request: paymentTokenRequest): Promise<Response<any>> {
        return await this.paymentService.addPayment(request);
    }

    @OpenAPI({
        description: 'Get Payment Transaction',
        summary: 'Get the payment transaction'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Post('/transaction')
    async addTransaction(@Body({validate: true}) request: PaymentTransactionRequest): Promise<Response<any>> {
        return await this.paymentService.postFinalTransaction(request);
    }

    @OpenAPI({
        description: 'testing',
        summary: 'testing'
    })
    @HttpCode(StatusCodes.CREATED)
    @Post('/testing')
    async postPhp(): Promise<Response<any>> {
        return await this.paymentService.postDataToPhpFile();
    }

    @OpenAPI({
        description: 'Invoices List',
        summary: 'Invoices List'
    })
    @HttpCode(StatusCodes.CREATED)
    @Get('/list')
    async getInvoicesList(@QueryParams() query: InvoiceListRequestDto): Promise<Response<any>> {
        return await this.paymentService.getInvoicesList(
            query?.vendorId,
            query?.userId,
            query?.invoiceId,
            query?.invoiceNumber
        );
    }

}