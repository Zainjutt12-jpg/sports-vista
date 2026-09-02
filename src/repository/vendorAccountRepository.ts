import VendorAccountEntity from "../entity/vendorAccountEntity";
import AppDataSource from "../config/dataSourceConfig";

export const VendorAccountRepository = AppDataSource.getRepository(VendorAccountEntity).extend({

    async seachAccountBycriteria(page : number , pageSize: number , vendorId: number): Promise<any>{
        let vendor = await this.createQueryBuilder('vendorAccount')
        .leftJoin('vendorAccount.Bank', 'Bank')
        .addSelect(['Bank.bankId', 'Bank.bankName' , 'Bank.active'])
        .leftJoin('vendorAccount.Vendor', 'Vendor')
        .addSelect(['Vendor.vendorId'])
        .where('(:vendorId IS NULL OR Vendor.vendorId = :vendorId)' , { vendorId });
        
        if(page && pageSize){
            await vendor.skip((page - 1) * pageSize).take(pageSize);
        } 
        
        return await vendor.getManyAndCount();
    }

})