import CreateUserRequest from "../dto/request/userRequest";
import UserInfoEntity from "../entity/userEntity";
import CreateUserResDto from "../dto/responce/userResponseDto";
export default class UserInfoMapper {

    public static toEntity(request: CreateUserRequest): UserInfoEntity {
        const user = new UserInfoEntity();
        user.username = request.username;
        user.email = request.email;
        user.password = request.password;
        user.areaId = request.areaId;
        user.phoneNumber = request.phoneNumber
        return user;
    }
    
    public static lookupDto(users?: UserInfoEntity[]): CreateUserResDto[] {
        const userData: CreateUserResDto[] = [];
        users?.forEach(user => {
            userData.push({
                userId: user.userId,
                username: user.username,
                email: user.email,
                areaId: user.areaId,
                createTime: user.createTime,
                phoneNumber:user.phoneNumber
            });
        });
        return userData;
    }
    public static lookupUserDto(user: UserInfoEntity): CreateUserResDto {
        return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            areaId: user.areaId,
            createTime: user.createTime,
            phoneNumber:user.phoneNumber
        };
    }

}
