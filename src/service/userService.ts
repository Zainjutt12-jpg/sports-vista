import  CreateUserResDto  from "../dto/responce/userResponseDto";
import Response from "../common/responce/Responce";
import { CREATED } from '../common/responce/StatusCode';
import CreateUserDto ,{UpdateUserDto,ForgetPassword} from "../dto/request/userRequest";
import UserInfoEntity from "../entity/userEntity";
import UserMapper  from "../mapper/userMapper-w";
import { UserInfoRepository } from "../repository/userRepository";
import { EntityManager } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { EventListenerTypes } from "typeorm/metadata/types/EventListenerTypes";
import { validatePassword } from "../common/functions";

export default class UserInfoWriteService {

    private userRepo = UserInfoRepository;
    async addUser(request: CreateUserDto) {
        let user: UserInfoEntity;

        await this.userRepo.manager.transaction(async (entityManager: EntityManager) => {
            user = UserMapper.toEntity(request);
            user = await entityManager.save(user);
        });
                
        const secretKey = 'mySportsVista0099!'; 

        const token = jwt.sign(
            { userId: user.userId },
            secretKey,
            { expiresIn: '90d' } 
        );

        return new Response<any>({ user, token },CREATED.status);
    }


    async getUsers(){
        let data : UserInfoEntity[] = await this.userRepo.find();
        let userDto : CreateUserResDto[] = UserMapper.lookupDto(data);
        return new Response<any>(userDto);
    }


    async updateUser(userId: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepo.findOne({ where: { userId } });

        if (!user) {
            throw new Error('User not found');
        }
        if (updateUserDto.username !== undefined) user.username = updateUserDto.username;
        if (updateUserDto.email !== undefined) user.email = updateUserDto.email;
        if (updateUserDto.password !== undefined) user.password = updateUserDto.password;
        if (updateUserDto.areaId !== undefined) user.areaId = updateUserDto.areaId;
        if(updateUserDto.phoneNumber !== undefined) user.phoneNumber = updateUserDto.phoneNumber
        await this.userRepo.save(user);
        return user;
    }
    
    async lookupUser(userId: number): Promise<Response<CreateUserResDto>> {
        const user = await this.userRepo.findOne({ where: { userId } });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        const userDto: CreateUserResDto = UserMapper.lookupUserDto(user);
        return new Response<any>(userDto);
    }
    
        async loginUser(email: string, password: string): Promise<Response<any>> {
        const user = await this.userRepo.findOne({ where: { email} });
        if (!user) {
            return new Response<any>({ message: 'Invalid email!' });
        }


        if (!await validatePassword(user.password , password)) {
            return new Response<any>({ message: 'Invalid Password!' });
        }

        const secretKey = 'mySportsVista0099!'; 

        const token = jwt.sign(
            { userId: user.userId },
            secretKey,
            { expiresIn: '90d' } 
        );

        const userDto: CreateUserResDto = {
            userId: user.userId,
            username: user.username,
            email: user.email,
            areaId: user.areaId,
            createTime: user.createTime,
            phoneNumber:user.phoneNumber,
            teamId:user.teamId 
        };

        return new Response<any>({ user: userDto, token }, CREATED.status);
    }


    // Forget The Password 
    async forgetThePassword(req:ForgetPassword): Promise<Response<ForgetPassword>>{
        const user = await this.userRepo.findOne({ where: { email: req.email } });
        if(user){
            let user = await this.userRepo.findOne({where:{phoneNumber:req.phoneNumber}});
            if(user?.phoneNumber == req?.phoneNumber){
                user.password = req?.password;
                await this.userRepo.save(user);
            }else{
                throw new Error('Phone Number is not correct');
            }
        }else{
            throw new Error('Email is not correct');
        }
        return new Response<any>(CREATED.status);
    }

}
