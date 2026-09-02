import { EntityManager } from "typeorm";
import Response from "../common/responce/Responce";
import { CREATED } from "../common/responce/StatusCode";
import RegistrationTeamsReq, {RegistrationAndInvoices} from "../dto/request/registrationTournamentReq";
import RegistrationInfoMapper from "../mapper/registrationTeamMapper";
import RegistrationOfTeamEntity from "../entity/registrationOfTeamsEntity";
import { RegistrationInfoRepository } from "../repository/registrationTournamentRepo";
import registeredTeamsInfo from "dto/responce/registrationResponseDto";
import Invoice from "../entity/InvoiceEntity";
import InvoiceMapper from "../mapper/InvoiceMapper";

export default class RegistrationInfoService {
    private registrationRepo = RegistrationInfoRepository;

    async addRegistration(request: RegistrationAndInvoices){
        let registration : RegistrationOfTeamEntity;
        let invoices : Invoice;

        await this.registrationRepo.manager.transaction(async (entityManager: EntityManager) => {
            registration = RegistrationInfoMapper.toEntity(request);
            registration = await entityManager.save(registration);
            if(registration.registrationId || registration.registrationId !== null){
            invoices = InvoiceMapper.toCreateInvoice(request);
            invoices = await entityManager.save(invoices);
            }

        });
        return new Response<any>(CREATED);
    }

    async getTeamsRegistrations(tournamentId: any) {
        let data: RegistrationOfTeamEntity[];
        if (tournamentId) {
            data = await this.registrationRepo.createQueryBuilder('tournament_registrations')
                .leftJoinAndSelect('tournament_registrations.teams', 'team')
                .where('tournament_registrations.tournamentId = :tournamentId', { tournamentId })
                .orderBy('tournament_registrations.registrationId', 'ASC')
                .getMany();
        } else {
            data = await this.registrationRepo.find();
        }
            let teamDto: registeredTeamsInfo[] = await RegistrationInfoMapper.lookupDto(data);
            return new Response<any>(teamDto);
    }
    



}