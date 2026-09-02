import { Body, Get, HttpCode, JsonController, Post, Param, QueryParams, Patch, Put, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { StatusCodes } from "http-status-codes";
import CreateBookingDto, { BookingPaymentRequestDto, StatusUpdateDto, UpdateBookingRequestDto } from "../dto/request/bookingReq";
import BookingInfoService from "../service/bookingService";
import BookingResponse from "../dto/responce/bookingResponseDto";
import Response from "../common/responce/Responce";
import BookingByArenaId from "../dto/request/bookingRequestDto";
import { jwtAuthMiddleware } from "../config/authiddleware";
import CreateInvoiceDto, { BookingAndInvoicesReqDto } from "../dto/request/invoiceRequest";
import { finalRequestForbookingInvoices } from "../dto/request/bookingAndInvoicesRequestDto";
import CacheStringReqDto from "../dto/request/cacheStringRequest";

@JsonController('/bookings')
export default class BookingController {
    private bookingService: BookingInfoService = new BookingInfoService();

    @OpenAPI({
        description: 'Confirm Bookings',
        summary: 'Set multiple booking statuses to Confirmed'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Put('/confirm')
    async confirmBookings(@Body() body: StatusUpdateDto): Promise<Response<any>> {
        const { bookingIds } = body;
        return await this.bookingService.updateBookingStatus(bookingIds, 3);  // Set statusId to 3 (Confirmed)
    }

    @OpenAPI({
        description: 'Cancel Bookings',
        summary: 'Set multiple booking statuses to Cancelled'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Put('/cancel')
    async cancelBookings(@Body() body: StatusUpdateDto): Promise<Response<any>> {
        const { bookingIds } = body;
        return await this.bookingService.updateBookingStatus(bookingIds, 2);  // Set statusId to 2 (Cancelled)
    }

    @OpenAPI({
        description: 'add cache',
        summary: 'add cache storage.'
    })
    @HttpCode(StatusCodes.OK)
    @Post('/cache')
    async addCachew(@Body() body: CacheStringReqDto): Promise<Response<any>> {
        return await this.bookingService.addNewCacheString(body); 
    }

    @OpenAPI({
        description: 'Add Booking',
        summary: 'Create a new Booking'
    })
    @HttpCode(StatusCodes.CREATED)
    @UseBefore(jwtAuthMiddleware)
    @Post('/add-booking')
    async addBooking(@Body({ validate: true }) body: finalRequestForbookingInvoices): Promise<Response<any>> {
        return await this.bookingService.addBooking(body);
    }

    @OpenAPI({
        description: 'Get Bookings',
        summary: 'Get a list of all bookings'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/list')
    async getBookings(): Promise<Response<BookingResponse[]>> {
        return await this.bookingService.getBookings();
    }

    @OpenAPI({
        description: 'Get Bookings by User ID',
        summary: 'Get bookings associated with a specific user'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/user/:userId')
    async getBookingsByUserId(@Param('userId') userId: number): Promise<Response<BookingResponse[]>> {
        return await this.bookingService.getBookingsByUserId(userId);
    }

    @OpenAPI({
        description: 'Get Bookings by Arena ID',
        summary: 'Get bookings associated with a specific arena'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Get('/arena/:arenaId')
    async getBookingsByArenaId(@Param('arenaId') arenaId: number , @QueryParams() query: BookingByArenaId): Promise<Response<BookingResponse[]>> {
        return await this.bookingService.getBookingsByArenaId(
            arenaId,
            query.date,
            query.page,
            query.pageSize
        );
    }

    @OpenAPI({
        description: 'Update Payment Amount',
        summary: 'Update Payment Recieve by Worker'
    })
    @HttpCode(StatusCodes.OK)
    @UseBefore(jwtAuthMiddleware)
    @Put('/update-payment')
    async update_Payment_of_Booking( @Body({validate: true}) request: BookingPaymentRequestDto): Promise<Response<any>> {
        return this.bookingService.update_Payment_By_BookingId(request);
    }

}
