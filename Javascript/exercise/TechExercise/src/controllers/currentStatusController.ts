import {logger} from '../logger';
import WeatherService from '../services/weatherService';
import StripeService from '../services/stripeService';
import MyIpService from '../services/myIpService';
import IpStackService from '../services/ipStackService';
import ILocation from '../../src/interface/iLocation';
import IResponse from '../../src/interface/iResponse';
import requestIp from 'request-ip';
import MsgComponent from '../components/msg.component';
import {privateIp} from '../components/validate.component';
/**
 * Handles status data
 * @class
 */
class CurrentStatusController{
  private weather: WeatherService;
  private stripe: StripeService;
  private myIp: MyIpService;
  private ipStack: IpStackService;
  private resp: MsgComponent;
  constructor() {
    this.weather = new WeatherService();
    this.stripe = new StripeService();
    this.myIp = new MyIpService();
    this.ipStack = new IpStackService();
    this.resp = new MsgComponent("currentStatus");
  }

  /**
   * get current status
   * @param {object} request the request object
   * @param {object} response the response object
   * @param {function} next the next function
   * @return {undefined}
   */
   get = async(request:any, response:any, next:any) => {
    try{
      logger.info('CurrentStatusController: GET Request. Path: %s ID: %s', this.getHref(request), request.id);
      let clientIp:string = request.query.ip;
      if(clientIp && privateIp(clientIp)){
        clientIp = await this.myIp.get();

        if(!clientIp){
          logger.error('CurrentStatusController: GET Request. Path: %s Error %s', this.getHref(request), "get my public ip failed");
          return this.resp.send(response, 503);
        }
      }else if(!clientIp){
        clientIp = requestIp.getClientIp(request);
        if(!clientIp){
          logger.error('CurrentStatusController: GET Request. Path: %s Error %s', this.getHref(request), "get client ip failed");
          return this.resp.send(response, 503);
        }
        if(privateIp(clientIp)){
          clientIp = await this.myIp.get();
        }
        if(!clientIp){
          logger.error('CurrentStatusController: GET Request. Path: %s Error %s', this.getHref(request), "get my public ip failed");
          return this.resp.send(response, 503);
        }
      }

      const stripe = await this.stripe.getStripStatus();
      if(!stripe){
        logger.error('CurrentStatusController: GET Request. Path: %s Error %s', this.getHref(request), "get stripe status failed");
        return this.resp.send(response, 503);
      }
      const location:ILocation = await this.ipStack.getDetail(clientIp);
      if(!location){
        logger.error('CurrentStatusController: GET Request. Path: %s Error %s', this.getHref(request), "get client location failed");
        return this.resp.send(response, 503);
      }
      if(location.continent_code !== "EU"){
        logger.error('CurrentStatusController: GET Request. Path: %s Error %s', this.getHref(request), "Service failed payment required");
        return this.resp.send(response, 402);
      }
      const weather = await this.weather.getWeather(location);
      if(!weather){
        logger.error('CurrentStatusController: GET Request. Path: %s Error %s', this.getHref(request), "get weather failed");
        return this.resp.send(response, 503);
      }
      const respMsg: IResponse = {
        "date": stripe.updated,
        "status": stripe.summary,
        "weather": weather
      }
      return this.resp.send(response, 200, respMsg);
    }catch(e){
      logger.error('CurrentStatusController: GET Request. Path: %s Error %s', this.getHref(request), JSON.stringify(e));
      return this.resp.send(response, 500);
    }

  };

  private getHref = (request:any): string => {
    return request.protocol + "://" + request.get('host') + request.originalUrl;
  }
}

export const current:any = new CurrentStatusController();
