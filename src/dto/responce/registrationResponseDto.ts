export default class registeredTeamsInfo{
    registrationId:number;
    teamsInfo:teamResponse[];
    tournamentId:number;
    feesPaid:boolean;
}

export class teamResponse {
    teamName:string;
    teamLogo:string;
    teamDesc:string
    player7:string
    player6:string
    player5:string
    player4:string
    player3:string
    player2:string
    player1:string
}[]