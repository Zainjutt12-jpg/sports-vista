import * as fs from 'fs';
import * as path from 'path';
import { StatusCodes } from 'http-status-codes';
import TeamEntity from '../entity/teamEntity';
import TeamPlayerEntity from '../entity/teamPlayerEntity';
import teamPostDto from '../dto/request/teamsRequest';
import teamsResponseDto from '../dto/responce/teamsResponse';
import HttpException from '../common/exception/HttpException';

export default class teamsMapper {

    public static toPlayerNames(team: TeamEntity): string[] {
        return [...(team.players || [])]
            .sort((a, b) => a.rosterOrder - b.rosterOrder)
            .map((player) => player.playerName);
    }

    public static toPlayerEntities(playerNames: string[], teamId?: number): TeamPlayerEntity[] {
        return playerNames.map((playerName, index) => {
            const player = new TeamPlayerEntity();
            player.playerName = playerName;
            player.rosterOrder = index + 1;
            if (teamId !== undefined) {
                player.teamId = teamId;
            }
            return player;
        });
    }

    public static toEntity(req: teamPostDto): TeamEntity {
        const team = new TeamEntity();
        team.teamName = req.teamName;
        team.createdBy = req.createdBy;
        team.teamDesc = req.teamDesc;
        team.teamLogo = req.teamLogo;
        team.createdById = req.createdById;
        team.players = this.toPlayerEntities(req.players);
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
                    players: this.toPlayerNames(team),
                });
            }
        }
        return teamsData;
    }

    /**
     * Writes a base64 data-URI to local disk and returns the public URL.
     * Logos stay on the API host (see README). This is not cloud object storage.
     */
    public static async convertBase64ToImage(base64String: string, teamId: number, imageIndex: number): Promise<string> {
        if (!base64String || !base64String.startsWith('data:image')) {
            return '';
        }

        const base64Data = base64String.split(',')[1];
        if (!base64Data) {
            return '';
        }

        const fileName = `${teamId}-${imageIndex}.png`;
        const directory = path.join(__dirname, '..', 'team_logo');
        const filePath = path.join(directory, fileName);

        try {
            await fs.promises.mkdir(directory, { recursive: true });
            await fs.promises.writeFile(filePath, Buffer.from(base64Data, 'base64'));
            return `https://dev-athletickonnect.com/team_logo/${fileName}`;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error saving team logo';
            throw new HttpException(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Failed to save team logo',
                message,
            );
        }
    }
}
