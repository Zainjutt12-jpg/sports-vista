import ArenaMasterResponceDto from '../dto/responce/arenaDto';
import { ArenaMasterRepository } from '../repository/arenaMasterRepository';
import Response from '../common/responce/Responce';
import ArenaMapper from '../mapper/arenaMapper';
import SportsCategoryWriteService from './sportsCategoriesService-w';
import { ArenaRequestCreate, ArenaRequestUpdate } from '../dto/request/arenaCreateRequest';
import { EntityManager } from 'typeorm';
import ArenaMasterEntity from '../entity/arenaMasterEntity';
import { Arena_Not_Found, CREATED } from '../common/responce/StatusCode';
import PageResponse from '../common/responce/PageResponce';
import CourtResponceDto from '../dto/responce/courtResponceDto';
import { CourtsRepository } from '../repository/courtsRepository';
import CourtMapper from '../mapper/courtMapper';

export default class ArenaMasterService {
    private arnaRepo = ArenaMasterRepository;
    private sportsService: SportsCategoryWriteService = new SportsCategoryWriteService();

    async getArenas_By_AreaId_And_SportsCategory(areaId: number , sportsCategoryId: number , arenaId: number , vendorId: number , page: number , pageSize: number , active: boolean ) : Promise<Response<ArenaMasterResponceDto>> {
        let [data , total] : any[] = await this.arnaRepo.findArenas(areaId , arenaId , vendorId , page , pageSize , active);
        let categoryData : any = await this.sportsService.getSportsCategories();
        let arenaDto : ArenaMasterResponceDto[] = await ArenaMapper.lookupDto(data , sportsCategoryId , categoryData);
        let pagination: PageResponse = new PageResponse(pageSize , page , total)
        return new Response<any>(arenaDto , pagination);
    }

    async createArena_Master(request: ArenaRequestCreate){
        let arena : ArenaMasterEntity;

        await this.arnaRepo.manager.transaction(async (entityManager: EntityManager) => {
            arena = ArenaMapper.addArenaMaster(request);
            arena = await entityManager.save(arena);
        });
        return new Response<any>(CREATED);
    }

    async update_Arena_Master(request: ArenaRequestUpdate , arenaId: any , vendorId: any ){
        let arena : ArenaMasterEntity;

        await this.arnaRepo?.manager.transaction(async (entityManager: EntityManager) => {
            arena = await this.arnaRepo.fetchupdateArenaMaster(arenaId , vendorId);
            if(!arena){
                return;
            }
            arena.arenaName = request.arenaName;
            arena.availableSports = '['+(request.availableSports).toString()+']';
            arena.pricePerHour = request.pricePerHour;
            arena.nightCharges = request.nightCharges;
            arena.arenaPhone = request.arenaContactNumber;
            arena.noOfCourts = request.noOfCourts;
            arena.advanceCharges = request.advanceCharges;
            arena.weekendAdvance = request.weekendAdvance;
            arena.areaId = request.areaId;
            arena.cityId = request.cityId;
            arena.ruleId = request.ruleId;
            arena = await entityManager.save(arena);
        });
        if(!arena){
            return new Response<any>(Arena_Not_Found);
        }
        return new Response<any>(CREATED);
    }
    
    private courtRepo = CourtsRepository;
    async get_No_Of_Courts_By_ArenaId(arenaId: number): Promise<Response<CourtResponceDto[]>>{
        let data: ArenaMasterEntity[] = await this.courtRepo.getCourts(arenaId);
        let courtData = await CourtMapper.courtLookup(data);
        return new Response<any>(courtData);
    }

    async get_Arena_By_Searching(arenaName: string): Promise<Response<ArenaMasterResponceDto[]>>{
        let data: ArenaMasterEntity[] = await this.arnaRepo.searchArena(arenaName);
        let categoryData : any = await this.sportsService.getSportsCategories();
        let arenaDto : ArenaMasterResponceDto[] = await ArenaMapper.searchDto(data , categoryData);

        return new Response<any>(arenaDto);
    }
}