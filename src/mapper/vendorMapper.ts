import BankEntity from "../entity/bankEntity";
import CreateVendorDto from "../dto/request/vendorRequest";
import vendorResponse, { BankLookupResponseDto } from "../dto/responce/vendorResponseDto";
import VendorEntity from "../entity/vendorEntity";
import * as path from 'path';
import * as fs from 'fs';
import VendorAccountEntity from "../entity/vendorAccountEntity";

export default class VendorMapper {
    public static  toEntity(request : CreateVendorDto , vendorAccount: VendorAccountEntity) : VendorEntity {
        const vendor = new VendorEntity();
        vendor.address =  request.address;
        vendor.email = request.email;
        vendor.fullName = request.fullName;
        vendor.phoneNumber = request.phoneNumber;
        vendor.userName = request.userName;
        vendor.password = request.password;
        vendor.subscriptionId = request.subscriptionId;
        vendor.vendorAccountId = vendorAccount?.vendorAccountId;
        return vendor
    }


    

    public static lookupDto(vendors?: VendorEntity[]):vendorResponse [] {
        const vendorData: vendorResponse[] = [];
        vendors?.forEach(vendor => {
            vendorData.push({
                vendorId: vendor.vendorId,
                userName: vendor.userName,
                email: vendor.email,
                subscriptionId: vendor.subscriptionId,
                phoneNumber:vendor.phoneNumber,
                address:vendor.address,
                fullName:vendor.fullName
            });
        });
        return vendorData;
    }

    public static lookupVendorDto(vendor: VendorEntity): vendorResponse {
        return {
            vendorId: vendor.vendorId,
            userName: vendor.userName,
            email: vendor.email,
            subscriptionId: vendor.subscriptionId,
            phoneNumber:vendor.phoneNumber,
            address:vendor.address,
            fullName:vendor.fullName
        };
    }

    public static async lookupBanksDto(data: BankEntity[]): Promise<BankLookupResponseDto[]> {
        let bankList: BankLookupResponseDto[] = [];
        for(let d of data){
            bankList.push({
                bankId: d?.bankId,
                bankName: d?.bankName,
                bankUrl: fs.existsSync(`../arena_images/${d?.bankId}-bank.png`)? `https://dev-athletickonnect.com/images/${d?.bankId}-bank.png` : await this.convertBase64ToImage(d?.bankLogo , d?.bankId , 'bank'),
            });
        }
        return bankList;
    }

    public static async convertBase64ToImage(base64String: string , arenaId: any , imageIndex: any): Promise<string> {
        return new Promise((resolve, reject) => {

            if (!base64String || !base64String.startsWith('data:image')) {
                resolve('');
            }

            const base64Data = base64String.split(',')[1];
    
            const buffer = Buffer.from(base64Data, 'base64');
    
            const directory = path.dirname(`../ts-api-sports-vista-r-and-w/src/arena_images/${arenaId}-${imageIndex}.png`);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
    
            fs.writeFile(`../ts-api-sports-vista-r-and-w/src/arena_images/${arenaId}-${imageIndex}.png`, buffer, (err: any) => {
                if (err) {
                    reject(`Error saving image: ${err.message}`);
                } else {
                    resolve(`https://dev-athletickonnect.com/images/${arenaId}-${imageIndex}.png`);
                }
            });
        });
    }

}