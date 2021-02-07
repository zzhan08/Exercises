
import IRequestOptions from "../interface/iRequestJsOptions";
import IWeatherResponse from "../interface/iWeatherResponse";
import IWeather from "../interface/iWeatherResponse";
import ILocation from "../interface/iLocation";
import BasehttpService from "./BasehttpService";
import * as config from '../configuration/config.json';
import {logger} from '../logger';

export default class MyIpService extends BasehttpService{
  constructor() {
    super();
  }
  /**
   * set get my pubic ip
   * @return {promise} promise of my ip as string
   */
  get = () =>{

    const args:IRequestOptions = {
      url: config.myIpProtocol +"://" + config.myIpCheck,
       headers: {"Accept":"application/json"}
    };
    return this.sendGetRequest(args).then(
      (data: any)=>{
        if(data?.ip){
          return data.ip;
        }else{
          logger.error("My IP Service: failed at %s",args);
          return;
        }
      }
    );

  }
};