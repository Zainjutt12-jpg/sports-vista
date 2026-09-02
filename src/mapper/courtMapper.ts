import CourtResponceDto from "../dto/responce/courtResponceDto";
import ArenaMasterEntity from "../entity/arenaMasterEntity";

export default class CourtMapper{
    public static courtLookup(arenas: ArenaMasterEntity[]): CourtResponceDto[] {
        let courtRes : CourtResponceDto[] = [];
        for(let d = 1;  d <= arenas?.[0]?.noOfCourts ; d++){
            courtRes.push({
                courtId: d,
                courtName: d
            })
        }
        return courtRes;
    }
}