import BankEntity from "../entity/bankEntity";
import AppDataSource from "../config/dataSourceConfig";

export const BankRepository = AppDataSource.getRepository(BankEntity).extend({

    async fetchBankList(bankId: number): Promise<BankEntity[]>{
        return await this.createQueryBuilder('bank')
            .where('(:active IS NULL OR bank.active = :active)', { active: true })
            .where('(:bankId IS NULL OR bank.bankId = :bankId)', { bankId })
            .orderBy("bank.bankName", "ASC")
            .getMany();
    }

})