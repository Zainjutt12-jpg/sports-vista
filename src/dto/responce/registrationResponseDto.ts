export default class registeredTeamsInfo {
    registrationId: number;
    teamsInfo: teamResponse[];
    tournamentId: number;
    feesPaid: boolean;
}

export class teamResponse {
    teamId: number;
    teamName: string;
    teamLogo: string;
    teamDesc: string;
    players: string[];
}
