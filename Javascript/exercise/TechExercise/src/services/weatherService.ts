
import IRequestOptions from "../interface/iRequestJsOptions";
import IWeatherResponse from "../interface/iWeatherResponse";
import IWeather from "../interface/iWeatherResponse";
import ILocation from "../interface/iLocation";
import BasehttpService from "./BasehttpService";
import * as config from '../configuration/config.json';
import {logger} from '../logger';

export default class WeatherService extends BasehttpService{
  constructor() {
    super();
  }
  /**
   * set get weather status of location
   * @return {promise} promise of waether IStripeEntry
   */
  getWeather = (location: ILocation) =>{

    const args:IRequestOptions = {
      url: config.weatherProtocol +"://" + config.weatherUrl + "?lat=" + location.lat + "&lon=" + location.lon+"&appid="+config.APIkey,
      headers: {"Accept":"application/json"}
    };
    return this.sendGetRequest(args).then(
      (data: IWeatherResponse)=>{
        if(data.weather.length > 0){
          return data.weather[0].main;
        }else{
          logger.error("Weather Service: failed at %s",args);
          return;
        }

      }
    );

  }
};