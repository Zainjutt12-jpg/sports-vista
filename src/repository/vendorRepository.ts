import AppDataSource from "../config/dataSourceConfig";
import VendorEntity from '../entity/vendorEntity';

export const VendorInfoRepository = AppDataSource.getRepository(VendorEntity).extend({
    async fetchFirst(): Promise<VendorEntity | undefined> {
        return this.createQueryBuilder('vendor').getOne();
    },

    async findVendors(): Promise<VendorEntity[]> {
        return this.createQueryBuilder('vendor').getMany();
    },

    async findVendorByVenorId(vendorId: any): Promise<VendorEntity[]> {
        return this.createQueryBuilder('vendor')
        .where('(:vendorId IS NULL OR vendor.vendorId = :vendorId)', { vendorId })
        .getOne();
    },

    async findVendorByEmail(email: any): Promise<VendorEntity> {
        return this.createQueryBuilder('vendor')
        .where('(:email IS NULL OR vendor.email = :email)', { email })
        .getOne();
    }
});
