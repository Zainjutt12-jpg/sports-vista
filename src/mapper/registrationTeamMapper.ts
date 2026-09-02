import RegistrationTeamsReq from "../dto/request/registrationTournamentReq";
import RegistrationOfTeamEntity from "../entity/registrationOfTeamsEntity";
import registeredTeamsInfo, { teamResponse } from "dto/responce/registrationResponseDto";
import { TeamsInfoRepository } from "../repository/teamsRepository";
import teamsResponseDto from "../dto/responce/teamsResponse";
export default class RegistrationInfoMapper {

    public static toEntity(request: any): RegistrationOfTeamEntity {
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

                const teamInfo: teamResponse[] = teamDetails.map(detail => ({
                    teamName: detail.teamName,
                    teamLogo: detail.teamLogo,
                    teamDesc:detail.teamDesc,
                    teamId:detail.teamId,
                    player1 : detail.player1,
                    player2 : detail.player2,
                    player3 : detail.player3,
                    player4 : detail.player4,
                    player5 : detail.player5,
                    player6 : detail.player6,
                    player7 : detail.player7
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