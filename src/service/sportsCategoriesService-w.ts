import SportsCategoryResponceDto from "../dto/responce/sportsCategoryResponceDto";
import Response from "../common/responce/Responce";
import { CREATED } from "../common/responce/StatusCode";
import CreateSportsCategoryRequest from "../dto/request/sportsCategoryRequest";
import SportsCategoryEntity from "../entity/sportsCategoryEntity";
import SportsCategoryMapper from "../mapper/sportsCategoryMapper";
import { SportsCategoryRepository } from "../repository/sportsCategoryRepository";
import { EntityManager } from "typeorm";

export default class SportsCategoryWriteService {

    private sportsRepo = SportsCategoryRepository;

    async addSportCategory(request: CreateSportsCategoryRequest) {
        let category: SportsCategoryEntity;

        await this.sportsRepo.manager.transaction(async (entityManager: EntityManager) => {
            category = SportsCategoryMapper.toEntity(request);
            category = await entityManager.save(category);
        });
        return new Response<any>(CREATED);
    }

    async getSportsCategories(){
        let data : any[] = await this.sportsRepo.findCategories();
        let categoryDto : SportsCategoryResponceDto[] = SportsCategoryMapper.lookupDto(data);
        return new Response<any>(categoryDto);
    }
}