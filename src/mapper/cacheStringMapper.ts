import CacheString from "../entity/cacheStringEntity";
import CacheStringReqDto from "../dto/request/cacheStringRequest";


export default class CacheStringMapper{
    public static toCreateCacheString(req:CacheStringReqDto){
        
        // Initialize cacheString object
        const cacheString: CacheString = new CacheString();

        // Safely set its properties
        cacheString.cacheString = req.cacheString || 'undefined';
        cacheString.userId = req.userId || null;
        cacheString.vendorId = req.vendorId || null;

        return cacheString;

    }
}