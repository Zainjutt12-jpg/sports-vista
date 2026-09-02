import { Any, EntityManager, In } from "typeorm";
import BookingEntity from "../entity/bookingEntity";
import CacheStringReqDto from "../dto/request/cacheStringRequest";
import CacheString from "../entity/cacheStringEntity";
import CacheStringMapper from "../mapper/cacheStringMapper";
import { BookingInfoRepository } from "../repository/bookingRepository";
import BookingMapper from "../mapper/bookingMapper";
import { BookingPaymentRequestDto, UpdateBookingRequestDto } from "../dto/request/bookingReq";
import BookingResponse from "../dto/responce/bookingResponseDto";
import Response from "../common/responce/Responce";
import { CREATED } from "../common/responce/StatusCode";
import Invoice from "../entity/InvoiceEntity";
import PageResponse from "../common/responce/PageResponce";
import { finalRequestForbookingInvoices } from "dto/request/bookingAndInvoicesRequestDto";
import BookingInvoicesMapper from "../mapper/bookingInvoicesMapper";
import { CacheStringRepository } from "../repository/CacheStringRepository";
interface bookingIds {
  bookingId:number
}

export default class BookingInfoService {

  private bookingRepo = BookingInfoRepository;
  private cacheRepo = CacheStringRepository;

  constructor() {
  }

    // update a booking 
    async updateBookingStatus(bookingIds: number[], statusId: number): Promise<Response<any>> {
      // Find all bookings that match the provided bookingIds
      const bookings = await this.bookingRepo.findBy({ bookingId: In(bookingIds) });
    
      if (!bookings || bookings.length === 0) {
          throw new Error('No bookings found for the given IDs');
      }
    
      // Update status for each booking
      for (const booking of bookings) {
          booking.statusId = statusId;
          }
    
      // Save all updated bookings in a single call
      await this.bookingRepo.save(bookings);
    
      return new Response<any>(CREATED.status);
    }
    

    async addBooking(request: finalRequestForbookingInvoices) {
      const bookings: BookingEntity[] = [];
      let savedBookings: bookingIds[] = [];
      let invoices: Invoice[] = [];
      let invoiceNumber:string;
  
      // Get today's date as a Date object (midnight time)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to midnight
  
      // Helper function to split timeRangeId into contiguous groups
      const splitTimeRanges = (timeRangeId: string): string[] => {
          const timeRanges = timeRangeId.split(',').map(Number).sort((a, b) => a - b);
          const groups: number[][] = [];
          let currentGroup: number[] = [timeRanges[0]];
  
          for (let i = 1; i < timeRanges.length; i++) {
              if (timeRanges[i] === timeRanges[i - 1] + 1) {
                  currentGroup.push(timeRanges[i]);
              } else {
                  groups.push(currentGroup);
                  currentGroup = [timeRanges[i]];
              }
          }
          groups.push(currentGroup);
  
          return groups.map(group => group.join(','));
      };
  
      await this.bookingRepo.manager.transaction(async (entityManager: EntityManager) => {
          for (const bookingData of request.bookings) {
              // Split the timeRangeId into contiguous groups for each booking
              const timeRangeGroups = splitTimeRanges(bookingData.timeRangeId);
  
              for (const timeRangeGroup of timeRangeGroups) {
                  // Check if a booking with the same timeRangeId, arenaId, and date already exists
                  const existingBooking = await entityManager.findOne(BookingEntity, {
                      where: {
                          timeRangeIds: timeRangeGroup,
                          arenaId: bookingData.arenaId,
                          date: today, // Compare with the Date object
                      },
                  });
  
                  if (existingBooking) {
                      throw new Error(`A booking with the same time range (${timeRangeGroup}), arena, and date already exists.`);
                  }
  
                  // Proceed with booking creation if no duplicate found
                  const bookingRequest = {
                      ...bookingData,
                      timeRangeId: timeRangeGroup,
                  };
                  const booking = BookingMapper.toCreateBookings(bookingRequest);
                  await entityManager.save(booking);
                  savedBookings.push({ bookingId: booking.bookingId });
              }
  
              // Handle the invoice creation if the isVendor flag is false
              if (bookingData.isVendor === false) {
                  const invoice = BookingInvoicesMapper.toCreateInvoices(bookingData);
                  invoice.invoiceAmount = bookingData.invoiceAmount;
                  invoice.bookingId = savedBookings.map((booking: any) => booking.bookingId.toString()).join(',');
                  await entityManager.save(invoice);
                  invoiceNumber = invoice.invoiceNumber;
              }
          }
      });
  
      return new Response<any>({invoiceNumber},CREATED.status);
  }
      
  // Get all bookings
  async getBookings() {
    const data: BookingEntity[] = await this.bookingRepo.find();
    const bookingData: BookingResponse[] = await BookingMapper.lookupDto(data); // Await the asynchronous method
    return new Response<any>(bookingData);
  }
      
  // Get bookings by userId
  async getBookingsByUserId(userId: number): Promise<Response<any>> {
    const bookings = await this.bookingRepo.findBookingsByUserId(userId);

    if (!bookings.length) {
        throw new Error('No bookings found for this user');
    }

    // Await the asynchronous lookupDto method
    const bookingData: BookingResponse[] = await BookingMapper.lookupDto(bookings); 
    return new Response<any>(bookingData);
  }

  // Get bookings by arenaId
  async getBookingsByArenaId(
    arenaId: number,
    date: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<Response<any>> {
    const [data, total] = await this.bookingRepo.findBookingsByArenaId(arenaId, date, page, pageSize);

    let pagination: PageResponse = new PageResponse(pageSize, page, total);

    // Await the asynchronous lookupDto method
    const bookingData: BookingResponse[] = await BookingMapper.lookupDto(data); 
    return new Response<any>(bookingData, pagination);
  }

  async update_Payment_By_BookingId(request: BookingPaymentRequestDto){
    const recievedPerId: any = (request.recievedAmount / request?.bookingIds?.length);
    for(let bookingId of request?.bookingIds){
      const bookData = await this.bookingRepo.findBookingByBookingId(bookingId);
      let bookingEnt : BookingEntity;

      await this.bookingRepo?.manager.transaction(async (entityManager: EntityManager) => {
        bookingEnt = await this.bookingRepo.findBookingByBookingId(bookingId);
        bookingEnt.receivedAmount = Number(recievedPerId) +  Number(bookingEnt.receivedAmount);
        bookingEnt = await entityManager.save(bookingEnt);
      });
      await this.updateBookingStatus([bookingId] , 3);
    }

    return new Response<any>(CREATED);
  }

  async addNewCacheString(req:CacheStringReqDto){
    let cacheStorage : CacheString;
    await this.cacheRepo.manager.transaction(async(entityManager:EntityManager)=>{
      cacheStorage = await CacheStringMapper.toCreateCacheString(req);
      cacheStorage = await entityManager.save(cacheStorage);
    })
    return new Response<any>({cacheStorage},CREATED.status);
  }

}
