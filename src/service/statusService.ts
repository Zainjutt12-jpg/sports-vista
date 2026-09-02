import Response from "../common/responce/Responce";
import StatusMapper from "../mapper/statusMapper";
import { StatusRepository } from "../repository/statusRepository";

export default class StatusService  {

    private statusRepo = StatusRepository

    async get_Booking_Statuses_Admin_Lookup() {
        let [data , count] = await this.statusRepo.fetchAll();
        let mapData = await StatusMapper.lookupDto(data);
        return new Response<any>(mapData);
    }
}