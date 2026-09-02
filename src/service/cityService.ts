import CityResponceDto from "../dto/responce/cityResponceDto";
import { CityRepository } from "../repository/cityRepository";
import Response from "../common/responce/Responce";
import CityMapper from "../mapper/cityMapper";

export default class CityService {
    private cityRepo = CityRepository;

    async getCitiesLookup(cityId: number , provinceId: number) : Promise<Response<CityResponceDto>> {
        let data : any[] = await this.cityRepo.findCities(cityId , provinceId);
        let cityDto : CityResponceDto[] = CityMapper.lookupDto(data);
        return new Response<any>(cityDto);
    }

}