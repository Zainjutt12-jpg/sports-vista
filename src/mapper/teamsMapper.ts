import TeamEntity from "../entity/teamEntity";
import teamPostDto from "../dto/request/teamsRequest";
import teamsResponseDto from "../dto/responce/teamsResponse";
import * as path from 'path';
import * as fs from 'fs';

export default class teamsMapper{
   
    public static toEntity(req:teamPostDto) : TeamEntity {
        const team = new TeamEntity();
        team.teamName = req.teamName;
        team.createdBy = req.createdBy;
        team.teamDesc = req.teamDesc;
        team.teamLogo = req.teamLogo;
        team.createdById = req.createdById;
        team.player1 = req.player1;
        team.player2 = req.player2;
        team.player3 = req.player3;
        team.player4 = req.player4;
        team.player5 = req.player5;
        team.player6 = req.player6;
        team.player7 = req.player7;
        return team;
    }


    public static async lookupDto(teams?: TeamEntity[]): Promise<teamsResponseDto[]> {
        const teamsData: teamsResponseDto[] = [];
        if (teams) {
            for (const team of teams) {
                teamsData.push({
                    teamId: team.teamId,
                    teamName: team.teamName,
                    teamDesc: team.teamDesc,
                    teamLogo: await this.convertBase64ToImage(team?.teamLogo, team?.teamId, 1),
                    createdBy: team.createdBy,
                    createdById: team.createdById,
                    player1: team.player1,
                    player2: team.player2,
                    player3: team.player3,
                    player4: team.player4,
                    player5: team.player5,
                    player6: team.player6,
                    player7: team.player7,
                });
            }
        }
        return teamsData;
    }
    
    public static async convertBase64ToImage(base64String: string , teamId: any , imageIndex: any): Promise<string> {
        return new Promise((resolve, reject) => {

            if (!base64String || !base64String.startsWith('data:image')) {
                resolve('');
            }

            const base64Data = base64String.split(',')[1];
    
            const buffer = Buffer.from(base64Data, 'base64');
    
            const directory = path.dirname(`../ts-api-sports-vista-r-and-w/src/team_logo/${teamId}-${imageIndex}.png`);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
    
            fs.writeFile(`../ts-api-sports-vista-r-and-w/src/team_logo/${teamId}-${imageIndex}.png`, buffer, (err: any) => {
                if (err) {
                    reject(`Error saving image: ${err.message}`);
                } else {
                    resolve(`https://dev-athletickonnect.com/team_logo/${teamId}-${imageIndex}.png`); // Return the file path where the image is saved
                }
            });
        });
    }


} 