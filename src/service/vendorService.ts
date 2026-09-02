import { EntityManager } from "typeorm";
import * as jwt from 'jsonwebtoken';
import vendorResponse, { BankLookupResponseDto } from '../dto/responce/vendorResponseDto';
import { CREATED, DUBLICATE_EMAIL, UNAUTHORIZED, UPDATED } from '../common/responce/StatusCode';
import VendorMapper from "../mapper/vendorMapper";
import VendorEntity from "../entity/vendorEntity";
import { VendorInfoRepository } from '../repository/vendorRepository';
import CreateVendorDto , {updateVendorDtos, UpdateVendorInfoDto} from "../dto/request/vendorRequest";
import Response from "../common/responce/Responce";
import { BankRepository } from "../repository/bankRepository";
import { validatePassword } from "../common/functions";
import VendorAccountEntity from "../entity/vendorAccountEntity";
import { VendorAccountRepository } from "../repository/vendorAccountRepository";
import VendorAccountMapper from "../mapper/vendorAccountMapper";
import { ForgetPassword } from "../dto/request/userRequest";
import { secretKeyVendor } from "../common/constants";


export default class VendorInfoService {
     private vendorRepo = VendorInfoRepository;
     private bankRepo = BankRepository;
     private vendorAccountRepo = VendorAccountRepository;

     async addVendor(request: CreateVendorDto) {
        let newVendor: VendorEntity;
        let vendorAccount: VendorAccountEntity;
        if(request?.secretKey == secretKeyVendor){
            const vendorEmail = await this.vendorRepo.findOne({ where: { email: request?.email } });
            if(vendorEmail){
                return new Response<any>(DUBLICATE_EMAIL);
            }
            await this.vendorAccountRepo.manager.transaction(async (entityManager: EntityManager) => {
                vendorAccount = await VendorAccountMapper.toEntity(request?.vendorAccount);
                vendorAccount = await entityManager.save(vendorAccount);
            });
    
            await this.vendorRepo.manager.transaction(async (entityManager: EntityManager) => {
                newVendor = VendorMapper.toEntity(request , vendorAccount);
                newVendor = await entityManager.save(newVendor);
            });
                    
            const secretKey = 'mySportsVista0099!'; 
    
            const token = jwt.sign(
                { vendorId: newVendor.vendorId },
                secretKey,
                { expiresIn: '90d' } 
            );
            const { password , ...vendor } = newVendor;
    
            return new Response<any>({ vendor, token },CREATED.status);
        }else{
            return new Response<any>(UNAUTHORIZED);
        }
    }

    async getVendors(){
        let data : VendorEntity[] = await this.vendorRepo.find();
        let vendorData : vendorResponse[] = VendorMapper.lookupDto(data);
        return new Response<any>(vendorData);
    }

    async updateVendor(vendorId: number, updateVendorDto:updateVendorDtos ) {
        const vendor = await this.vendorRepo.findOne({ where: { vendorId } });

        if (!vendor) {
            throw new Error('Vendor not found');
        }
        if (updateVendorDto.userName !== undefined) vendor.userName = updateVendorDto.userName;
        if (updateVendorDto.address !== undefined) vendor.address = updateVendorDto.address;
        if (updateVendorDto.fullName !== undefined) vendor.fullName = updateVendorDto.fullName;
        if (updateVendorDto.email !== undefined) vendor.email = updateVendorDto.email;
        if (updateVendorDto.password !== undefined) vendor.password = updateVendorDto.password;
        if (updateVendorDto.subscriptionId !== undefined) vendor.subscriptionId = updateVendorDto.subscriptionId;
        if(updateVendorDto.phoneNumber !== undefined) vendor.phoneNumber = updateVendorDto.phoneNumber
        await this.vendorRepo.save(vendor);
        return vendor;
    }

    async updateVendorProfileInfo(vendorId: number, updateVendorDto: UpdateVendorInfoDto ) : Promise<Response<any>> {
        const vendor = await this.vendorRepo.findOne({ where: { vendorId } });

        if (!vendor) {
            throw new Error('Vendor not found');
        }
        if (updateVendorDto.userName !== undefined) vendor.userName = updateVendorDto.userName;
        if (updateVendorDto.address !== undefined) vendor.address = updateVendorDto.address;
        if (updateVendorDto.fullName !== undefined) vendor.fullName = updateVendorDto.fullName;
        if (updateVendorDto.email !== undefined) vendor.email = updateVendorDto.email;
        if(updateVendorDto.phoneNumber !== undefined) vendor.phoneNumber = updateVendorDto.phoneNumber
        await this.vendorRepo.save(vendor);
        return new Response<any>(UPDATED);
    }

    async loginVendor(email: string, password: string): Promise<Response<any>> {
        const vendor: VendorEntity = await this.vendorRepo.findVendorByEmail(email);

        if (!vendor) {
            return new Response<any>({ message: 'Invalid Email!' });
        }

        if (!await validatePassword(vendor.password , password)) {
            return new Response<any>({ message: 'Invalid Password!' });
        }

        const secretKey = 'mySportsVista0099!'; 

        const token = jwt.sign(
            { vendorId: vendor.vendorId },
            secretKey,
            { expiresIn: '90d' } 
        );

        const vendorDto: vendorResponse = {
            vendorId: vendor.vendorId,
            userName: vendor.userName,
            email: vendor.email,
            subscriptionId: vendor.subscriptionId,
            phoneNumber:vendor.phoneNumber,
            address:vendor.address,
            fullName:vendor.fullName
        };

        return new Response<any>({ vendor: vendorDto, token }, CREATED.status);
    }
    
    async getBanksLookup(bankId: number) : Promise<Response<any>>{
        let data: any[] = await this.bankRepo.fetchBankList(bankId);
        let bankLookup : BankLookupResponseDto[] = await VendorMapper.lookupBanksDto(data);
        return new Response<any>(bankLookup);
    }

    // Forget The Password 
    async forgetThePassword(req:ForgetPassword): Promise<Response<ForgetPassword>>{
        const user = await this.vendorRepo.findOne({ where: { email: req.email } });
        if(user){
            let vendor = await this.vendorRepo.findOne({where:{phoneNumber:req.phoneNumber}});
            if(vendor?.phoneNumber == req?.phoneNumber){
                vendor.password = req?.password;
                await this.vendorRepo.save(vendor);
            }else{
                throw new Error('Phone Number is not correct');
            }
        }else{
            throw new Error('Email is not correct');
        }
        return new Response<any>(CREATED.status);
    }

}