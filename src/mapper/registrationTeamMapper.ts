import RegistrationTeamsReq from '../dto/request/registrationTournamentReq';
import RegistrationOfTeamEntity from '../entity/registrationOfTeamsEntity';
import registeredTeamsInfo, { teamResponse } from '../dto/responce/registrationResponseDto';
import { TeamsInfoRepository } from '../repository/teamsRepository';
import teamsMapper from './teamsMapper';

export default class RegistrationInfoMapper {

    public static toEntity(request: RegistrationTeamsReq): RegistrationOfTeamEntity {
        const registration = new RegistrationOfTeamEntity();
        registration.teamId = request.teamId;
        registration.tournamentId = request.tournamentId;
        registration.feesPaid = request.feesPaid;
        return registration;
    }

    public static async lookupDto(teams?: RegistrationOfTeamEntity[]): Promise<registeredTeamsInfo[]> {
        const teamsData: registeredTeamsInfo[] = [];

        if (teams) {
            for (const team of teams) {
                const teamDetails = await TeamsInfoRepository.letsFindTeamsByTeamId(team.teamId);

                const teamInfo: teamResponse[] = teamDetails.map((detail) => ({
                    teamName: detail.teamName,
                    teamLogo: detail.teamLogo,
                    teamDesc: detail.teamDesc,
                    teamId: detail.teamId,
                    players: teamsMapper.toPlayerNames(detail),
                }));

                teamsData.push({
                    registrationId: team.registrationId,
                    teamsInfo: teamInfo,
                    tournamentId: team.tournamentId,
                    feesPaid: team.feesPaid,
                });
            }
        }

        return teamsData;
    }
}
