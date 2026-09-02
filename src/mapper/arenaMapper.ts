import { ArenaRequestCreate } from "../dto/request/arenaCreateRequest";
import ArenaMasterResponceDto from "../dto/responce/arenaDto";
import ArenaMasterEntity from "../entity/arenaMasterEntity";
import * as path from 'path';
import * as fs from 'fs';

export default class ArenaMapper {
    public static async lookupDto(arena: ArenaMasterEntity[] , sportsCategoryId: number , categoriesData: any): Promise<ArenaMasterResponceDto[]> {
            let arenaDto: ArenaMasterResponceDto[] = [];
            for(let d of arena){
                const sports: any[] = await this.getSports(d);
                const sportsDetail = await this.getSportsData(d , categoriesData , sports);
    
                if(sports.includes(sportsCategoryId) || !sportsCategoryId){
                    arenaDto.push({
                        arenaId: d?.arenaId,
                        arenaName: d?.arenaName,
                        arenaAddress: d?.arenaAddress,
                        availableSports: sportsDetail,
                        pricePerHour: d?.pricePerHour,
                        advanceCharges: d?.advanceCharges,
                        primaryPic: fs.existsSync(`../arena_images/${d?.arenaId}-1.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-1.png` : await this.convertBase64ToImage(d?.primaryPic , d?.arenaId , 1),
                        areaId: d?.areaId,
                        areaName: d?.areas[0]?.areaName,
                        vendorId: d?.vendorId,
                        arenaPhone: d?.arenaPhone,
                        nightCharges:d?.nightCharges,
                        weekendAdvance:d?.weekendAdvance,
                        noOfCourts: d?.noOfCourts,
                        iframeLink: d?.iframeLink,
                        ruleId: d?.ruleId,
                        image1: fs.existsSync(`../arena_images/${d?.arenaId}-2.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-2.png` : await this.convertBase64ToImage(d?.image1 , d?.arenaId , 2),
                        image2: fs.existsSync(`../arena_images/${d?.arenaId}-3.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-3.png` : await this.convertBase64ToImage(d?.image2 , d?.arenaId , 3),
                        image3: fs.existsSync(`../arena_images/${d?.arenaId}-4.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-4.png` : await this.convertBase64ToImage(d?.image3 , d?.arenaId , 4),
                        image4: fs.existsSync(`../arena_images/${d?.arenaId}-5.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-5.png` : await this.convertBase64ToImage(d?.image4 , d?.arenaId , 5),
                        image5: fs.existsSync(`../arena_images/${d?.arenaId}-6.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-6.png` : await this.convertBase64ToImage(d?.image5 , d?.arenaId , 6),
                        cityId: d?.cityId,
                        cityName: d?.cities[0]?.cityName,
                        active: d?.active
                    });
                }
            }
            return arenaDto;
    }

    private static async getSportsData(d: any , categoriesData: any , sports: any[]): Promise<any[]>{
        let sportsDetail: any[] = [];
        sports.forEach((d: any) => {
            const filteredCategories = categoriesData?.payload?.filter((category: any) => category.sportsCategoryId === d)[0] || {};
            sportsDetail.push(filteredCategories);
        });
        return sportsDetail;
    }

    private static async getSports(d: any): Promise<any[]> {
        let sports: any[] = d.availableSports.split('');
        sports = sports.filter(( data , index) => index % 2 !== 0);
        sports = sports.map((d: any) => Number(d));
        return sports;
    }

    public static addArenaMaster(arenaRequest: ArenaRequestCreate): ArenaMasterEntity{
        let arenas: ArenaMasterEntity = new ArenaMasterEntity();
        arenas.arenaName = arenaRequest.arenaName;
        arenas.arenaAddress = arenaRequest.arenaAddress;
        arenas.availableSports = '['+(arenaRequest.availableSports).toString()+']';
        arenas.pricePerHour = arenaRequest.pricePerHour;
        arenas.arenaPhone = arenaRequest.arenaContactNumber;
        arenas.noOfCourts = arenaRequest.noOfCourts;
        arenas.primaryPic = arenaRequest.primaryPic;
        arenas.advanceCharges = arenaRequest.advanceCharges;
        arenas.iframeLink = arenaRequest.iframeLink;
        arenas.areaId = arenaRequest.areaId;
        arenas.vendorId = arenaRequest.vendorId;
        arenas.ruleId = arenaRequest.ruleId;
        arenas.nightCharges = arenaRequest.nightCharges;
        arenas.weekendAdvance = arenaRequest.weekendAdvance;
        arenas.cityId = arenaRequest.cityId;
        arenas.image1 = arenaRequest.images[0]?.toString();
        arenas.image2 = arenaRequest.images[1]?.toString();
        arenas.image3 = arenaRequest.images[2]?.toString();
        arenas.image4 = arenaRequest.images[3]?.toString();
        arenas.image5 = arenaRequest.images[4]?.toString();
        return arenas;
    }

    public static async convertBase64ToImage(base64String: string , arenaId: any , imageIndex: any): Promise<string> {
        return new Promise((resolve, reject) => {

            if (!base64String || !base64String.startsWith('data:image')) {
                resolve('');
            }

            const base64Data = base64String.split(',')[1];
    
            const buffer = Buffer.from(base64Data, 'base64');
    
            const directory = path.dirname(`../ts-api-sports-vista-r-and-w/src/arena_images/${arenaId}-${imageIndex}.png`);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
    
            fs.writeFile(`../ts-api-sports-vista-r-and-w/src/arena_images/${arenaId}-${imageIndex}.png`, buffer, (err: any) => {
                if (err) {
                    reject(`Error saving image: ${err.message}`);
                } else {
                    resolve(`https://dev-athletickonnect.com/images/${arenaId}-${imageIndex}.png`); // Return the file path where the image is saved
                }
            });
        });
    }

    public static async searchDto(arena: ArenaMasterEntity[] , categoriesData: any): Promise<ArenaMasterResponceDto[]> {
        let arenaDto: ArenaMasterResponceDto[] = [];
        for(let d of arena){
            const sports: any[] = await this.getSports(d);
            const sportsDetail = await this.getSportsData(d , categoriesData , sports);

            arenaDto.push({
                arenaId: d?.arenaId,
                arenaName: d?.arenaName,
                arenaAddress: d?.arenaAddress,
                availableSports: sportsDetail,
                pricePerHour: d?.pricePerHour,
                advanceCharges: d?.advanceCharges,
                primaryPic: fs.existsSync(`../arena_images/${d?.arenaId}-1.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-1.png` : await this.convertBase64ToImage(d?.primaryPic , d?.arenaId , 1),
                areaId: d?.areaId,
                areaName: d?.areas[0]?.areaName,
                vendorId: d?.vendorId,
                arenaPhone: d?.arenaPhone,
                noOfCourts: d?.noOfCourts,
                weekendAdvance:d?.weekendAdvance,
                nightCharges:d?.nightCharges,
                iframeLink: d?.iframeLink,
                ruleId: d?.ruleId,
                image1: fs.existsSync(`../arena_images/${d?.arenaId}-2.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-2.png` : await this.convertBase64ToImage(d?.image1 , d?.arenaId , 2),
                image2: fs.existsSync(`../arena_images/${d?.arenaId}-3.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-3.png` : await this.convertBase64ToImage(d?.image2 , d?.arenaId , 3),
                image3: fs.existsSync(`../arena_images/${d?.arenaId}-4.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-4.png` : await this.convertBase64ToImage(d?.image3 , d?.arenaId , 4),
                image4: fs.existsSync(`../arena_images/${d?.arenaId}-5.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-5.png` : await this.convertBase64ToImage(d?.image4 , d?.arenaId , 5),
                image5: fs.existsSync(`../arena_images/${d?.arenaId}-6.png`)? `https://dev-athletickonnect.com/images/${d?.arenaId}-6.png` : await this.convertBase64ToImage(d?.image5 , d?.arenaId , 6),
                cityId: d?.cityId,
                cityName: d?.cities[0]?.cityName,
                active: d?.active
            });
        }
        return arenaDto;
    }

}