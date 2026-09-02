import CreateSportsCategoryRequest from "../dto/request/sportsCategoryRequest";
import SportsCategoryEntity from "../entity/sportsCategoryEntity";
import SportsCategoryResponceDto from '../dto/responce/sportsCategoryResponceDto';

export default class SportsCategoryMapper {

    public static toEntity(request: CreateSportsCategoryRequest): SportsCategoryEntity {
        let categories : SportsCategoryEntity = new SportsCategoryEntity();
        categories.sportsCategoryName = request.categoryName;
        categories.sportsIconName = request.iconName;
        return categories;
    }
    
    public static lookupDto(category?: SportsCategoryEntity[]): SportsCategoryResponceDto[] {
        let categoryData : SportsCategoryResponceDto[] = [];
        category.forEach((d: any)=>{
            categoryData.push({
                sportsCategoryId: d?.sportsCategoryId,
                sportsCategoryName: d?.sportsCategoryName,
                sportsIconName: d?.sportsIconName
            })
        })
        return categoryData;
    }}