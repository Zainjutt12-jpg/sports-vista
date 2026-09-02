import CreateAreaRequest from "../dto/request/areaRequest";
import AreaResponceDto from "../dto/responce/areaResponceDto";
import AreaEntity from "../entity/areaEntity";

export default class AreaMapper {
    public static lookupDto(area?: AreaEntity[]): AreaResponceDto[] {
        let areaData : AreaResponceDto[] = [];
        area.forEach((d: any)=>{
            areaData.push({
                areaId: d?.areaId,
                areaName: d?.areaName,
                cityId: d?.city?.cityId,
                cityName: d?.city?.cityName
            })
        })
        return areaData;
    }
    public static toEntity(request: CreateAreaRequest): AreaEntity {
        let areas : AreaEntity = new AreaEntity();
        areas.areaName = request.areaName;
        areas.cityId = request.cityId;
        return areas;
    }
}