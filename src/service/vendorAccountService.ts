import { VendorAccountRepository } from "../repository/vendorAccountRepository";
import Response from "../common/responce/Responce";
import VendorAccountEntity from "../entity/vendorAccountEntity";
import { EntityManager } from "typeorm";
import { CREATED, UPDATED } from "../common/responce/StatusCode";
import { CreateVendorAccountRequestDto, UpdateVendorAccountRequestDto } from "../dto/request/vendorAccountRequestDto";
import VendorAccountMapper from "../mapper/vendorAccountMapper";
import * as moment from 'moment';
import PageResponse from "../common/responce/PageResponce";
import { VendorAccountResponseDto } from "../dto/responce/vendorAccountResponseDto";

export default class VendorAccountService {
 
    private vendorAccountRepo = VendorAccountRepository;

    async updateVendorBankAccount(vendorAccountId: number , request: UpdateVendorAccountRequestDto) : Promise<Response<any>>{
        const vendorAccount = await this.vendorAccountRepo.findOne({ where: { vendorAccountId } });
        
        if (!vendorAccount) {
            throw new Error('Vendor Account not found');
        }
        if(request?.accountNumber) vendorAccount.accountNumber = request?.accountNumber;
        if(request?.bankId) vendorAccount.bankId = request?.bankId;
        if(request?.ibanAccountNumber) vendorAccount.ibanAccountNumber = request?.ibanAccountNumber;
        if(request?.accountHolderName) vendorAccount.accountHolderName = request?.accountHolderName;
        vendorAccount.lastModifiedBy = request?.createdBy;
        vendorAccount.lastModifiedAt = moment().format('YYYY-MM-DD HH:mm:ss')
        
        await this.vendorAccountRepo.save(vendorAccount);
        return new Response<any>(UPDATED);
    }

    async getAccountsListByCriteria(page : number , pageSize: number , vendorId: number) : Promise<Response<any>> {
        let [data , total] : any[] = await this.vendorAccountRepo.seachAccountBycriteria(page , pageSize , vendorId);
        let accountDto : VendorAccountResponseDto[] = await VendorAccountMapper.getCriteriaMapper(data);
        let pagination: PageResponse = new PageResponse(pageSize , page , total)
        return new Response<any>(accountDto , pagination);
    }

}