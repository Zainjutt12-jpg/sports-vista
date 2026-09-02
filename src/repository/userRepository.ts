import { Repository } from 'typeorm';
import AppDataSource from "../config/dataSourceConfig";
import UserInfoEntity from '../entity/userEntity';

export const UserInfoRepository = AppDataSource.getRepository(UserInfoEntity).extend({
    async fetchFirst(): Promise<UserInfoEntity | undefined> {
        return this.createQueryBuilder('user_info').getOne();
    },
    async findUsers(): Promise<UserInfoEntity[]> {
        return this.createQueryBuilder('user_info').getMany();
    },
    async findUsersByUserId(userId: any): Promise<UserInfoEntity[]> {
        return this.createQueryBuilder('user_info')
        .where('(:userId IS NULL OR user_info.userId = :userId)', { userId })
        .getOne();
    }
});
