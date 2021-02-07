
import IRequestOptions from "../interface/iRequestJsOptions";
import ILocation from "../interface/iLocation";
import BasehttpService from "./BasehttpService";
import * as config from '../configuration/config.json';
import {logger} from '../logger';

export default class IpStackService extends BasehttpService{
  constructor() {
    super();
  }
  /**
   * set get detail if ip
   * @param {string} ip
   * @return {promise} promise of ILocation
   */
  getDetail = (ip:string) =>{

    const args:IRequestOptions = {
      url: config.ipStackProtocol +"://" + config.ipstackUrl + "/" + ip + "?access_key=" + config.ipStackAccessKey,
      headers: {"Accept":"application/json"}
    };
    return this.sendGetRequest(args).then(
      (data: any)=>{
        if(data){
          const location:ILocation = {
            lat:data.latitude,
            lon:data.longitude,
            continent_code:data.continent_code
          };
          return location;
        }else{
          logger.error("IP Stack Service: failed at %s",args);
          return ;
        }

      }
    );

  }
};