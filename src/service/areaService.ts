import AreaEntity from "../entity/areaEntity";
import Response from "../common/responce/Responce";
import AreaResponceDto from "../dto/responce/areaResponceDto";
import AreaMapper from "../mapper/areaMapper";
import { AreaRepository } from "../repository/areaRepository";
import { EntityManager } from "typeorm";
import CreateAreaRequest from "../dto/request/areaRequest";
import { CREATED } from "../common/responce/StatusCode";

export default class AreaService {
    private areaRepo = AreaRepository;

    async getAreasByCityId(cityId: number) : Promise<Response<AreaResponceDto>> {
        let data : any[] = await this.areaRepo.findAreas(cityId);
        let areaDto : AreaResponceDto[] = AreaMapper.lookupDto(data);
        return new Response<any>(areaDto);
    }

    async addArea(request: CreateAreaRequest) {
        let area : AreaEntity;

        await this.areaRepo.manager.transaction(async (entityManager: EntityManager) => {
            area = AreaMapper.toEntity(request);
            area = await entityManager.save(area);
        });
        return new Response<any>(CREATED);
    }
}