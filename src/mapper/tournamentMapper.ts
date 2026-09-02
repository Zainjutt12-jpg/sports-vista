import { GetTournamentResponceDto } from "../dto/responce/tournamentResponceDto";
import { AddTournamentRequestDto } from "../dto/request/tournamentRequest";
import TournamentEntity from "../entity/tournamentEntity";
import * as path from 'path';
import * as fs from 'fs';

export default class TournamentMapper {

    public static addMapper(request: AddTournamentRequestDto) : TournamentEntity {
        let tournamentData : TournamentEntity = new TournamentEntity();

        tournamentData.vendorId = request?.vendorId;
        tournamentData.arenaId = request?.arenaId;
        tournamentData.tournamentDesc = request?.tournamentDesc;
        tournamentData.tournamentLogo = request?.tournamentLogo;
        tournamentData.tournamentName = request?.tournamentName;
        tournamentData.date = request?.date;
        tournamentData.registrationFee = request?.registrationFee;
        tournamentData.runnerUpPrize = request?.runnerUpPrize;
        tournamentData.timeRangeEndId = request?.timeRangeEndId;
        tournamentData.timeRangeStartId = request?.timeRangeStartId;
        tournamentData.winningPrize = request?.winningPrize;
        tournamentData.isThirdParty = request?.isThirdParty;
        tournamentData.hostCnic = request?.hostCnic;
        tournamentData.hostName = request?.hostName;
        tournamentData.hostedBy = request?.hostedBy;
        tournamentData.noOfTeams = request?.noOfTeams;
        tournamentData.sportsCategoryId = request?.sportsCategoryId;
        
        return tournamentData;
    }

    public static async getCriteriaMapper(data : TournamentEntity[] , isActive: boolean) : Promise<GetTournamentResponceDto[]> {
        let tournamentData : GetTournamentResponceDto[] = [];
        for(let d of data){
            const tournamentStatus = this.getStatus(d?.date);
            if(!isActive || tournamentStatus?.statusId == 1){
                tournamentData.push({
                    tournamentId: d?.tournamentId,
                    tournamentName: d?.tournamentName,
                    tournamentLogo: fs.existsSync(`../tournament_logos/${d?.tournamentId}-${d?.vendorId}.png`)? `https://dev-athletickonnect.com/tournament_logos/${d?.tournamentId}-${d?.vendorId}.png` : await this.convertBase64ToImage(d?.tournamentLogo , d?.tournamentId , d?.vendorId),
                    tournamentDesc: d?.tournamentDesc,
                    vendorId: d?.vendorId,
                    vendorName: d?.vendor?.fullName,
                    arenaId: d?.arenaId,
                    arenaName: d?.arena?.arenaName,
                    registrationFee: d?.registrationFee,
                    date: d?.date,
                    timeRangeStartId: d?.timeRangeStartId,
                    timeRangeStart: d?.timeStart?.timingRange?.split('-')[0],
                    timeRangeEndId: d?.timeRangeEndId,
                    timeRangeEnd: d?.timeEnd?.timingRange?.split('-')[1],
                    isThirdParty: d?.isThirdParty,
                    hostedBy: d?.hostedBy,
                    hostName: d?.hostName,
                    hostCnic: d?.hostCnic,
                    winningPrize: d?.winningPrize,
                    runnerUpPrize: d?.runnerUpPrize,
                    noOfTeams: d?.noOfTeams,
                    sportsCategoryId: d?.sportsCategory?.sportsCategoryId,
                    sportsCategoryName: d?.sportsCategory?.sportsCategoryName,
                    statusId: tournamentStatus?.statusId,
                    statusName: tournamentStatus?.statusName,
                });
            }
        }
        return tournamentData;
    }

    public static async convertBase64ToImage(base64String: string , tournamentId: any , vendorId: any): Promise<string> {
        return new Promise((resolve, reject) => {

            if (!base64String || !base64String.startsWith('data:image')) {
                resolve('');
            }

            const base64Data = base64String.split(',')[1];
    
            const buffer = Buffer.from(base64Data, 'base64');
    
            const directory = path.dirname(`../ts-api-sports-vista-r-and-w/src/tournament_logos/${tournamentId}-${vendorId}.png`);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
    
            fs.writeFile(`../ts-api-sports-vista-r-and-w/src/tournament_logos/${tournamentId}-${vendorId}.png`, buffer, (err: any) => {
                if (err) {
                    reject(`Error saving image: ${err.message}`);
                } else {
                    resolve(`https://dev-athletickonnect.com/tournament_logos/${tournamentId}-${vendorId}.png`); // Return the file path where the image is saved
                }
            });
        });
    }

    private static getStatus(date: string): any {
        const todayDate: string = new Date().toISOString().split('T')[0];
        const currentDate = new Date(todayDate);
        const inputDate = new Date(date);

        if (
            inputDate.getFullYear() === currentDate.getFullYear() &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getDate() === currentDate.getDate()
        ) {
            return { statusName: 'In Progress' , statusId: 2};
        } else if (inputDate > currentDate) {
            return { statusName: 'New' , statusId: 1};
        } else {
            return { statusName: 'Completed' , statusId: 3};
        }
    }
}