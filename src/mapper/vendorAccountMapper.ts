import { VendorAccountResponseDto } from "../dto/responce/vendorAccountResponseDto";
import { CreateVendorAccountRequestDto } from "../dto/request/vendorAccountRequestDto";
import VendorAccountEntity from "../entity/vendorAccountEntity";
import * as moment from 'moment';

export default class VendorAccountMapper {

    public static async toEntity(request: CreateVendorAccountRequestDto): Promise<VendorAccountEntity> {
        const vendorAccount = new VendorAccountEntity();
            vendorAccount.bankId =  request?.bankId;
            vendorAccount.accountNumber = request?.accountNumber;
            vendorAccount.accountHolderName = request?.accountHolderName;
            vendorAccount.ibanAccountNumber = request?.ibanAccountNumber;
            vendorAccount.balance = 0.00;
            vendorAccount.createdBy = request?.createdBy;
            vendorAccount.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
            vendorAccount.lastModifiedBy = request?.createdBy;
            vendorAccount.lastModifiedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            vendorAccount.active = true;
        return vendorAccount
    }

    public static async getCriteriaMapper(data : VendorAccountEntity[]) : Promise<VendorAccountResponseDto[]> {
        let accountData : VendorAccountResponseDto[] = [];
        for(let d of data){
            accountData.push({
                vendorAccountId: d?.vendorAccountId,
                accountHolderName: d?.accountHolderName,
                accountNumber: d?.accountNumber,
                bankId: d?.bankId,
                bankName: d?.Bank?.bankName,
                ibanNumber: d?.ibanAccountNumber,
                balance: d?.balance,
                vendorId: d?.Vendor?.vendorId,
                active: d?.active
            });
        }
        return accountData;
    }

}