import { IsNotEmpty, MaxLength } from "class-validator";

export default class CreateSportsCategoryRequest{

    @IsNotEmpty()
    @MaxLength(50)
    categoryName: string;

    @IsNotEmpty()
    @MaxLength(50)
    iconName: string;
}