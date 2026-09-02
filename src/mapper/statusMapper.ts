import { AdminStatusResponceDto } from "../dto/responce/statusResponceDto";
import StatusEntity from "../entity/statusEntity";

export default class StatusMapper {

    public static lookupDto(lookupData: StatusEntity[]): AdminStatusResponceDto[] {
        let arrayData: AdminStatusResponceDto[] = [];

        lookupData.forEach((d: any)=>{
            arrayData.push({
                statusId: d?.statusId,
                statusName: d?.statusName
            })
        });

        return arrayData;
    }
}