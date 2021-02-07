
import IRequestOptions from "../interface/iRequestJsOptions";
import IStripeEntry from "../interface/iStripeEntry"
import BasehttpService from "./basehttpService";
import * as config from '../configuration/config.json';
import {logger} from '../logger';

export default class StripeService extends BasehttpService{
  constructor() {
    super();
  }

  getStripStatus = () =>{
    const args:IRequestOptions = {
      url: config.stripProtocol +"://" + config.stripUrl,
      headers: {"Accept":"application/xml"}
    };
    /**
     * set get stripe status
     * @return {promise} promise of latest IStripeEntry
     */
    return this.sendGetRequest(args).then(
      (jsonResp)=>{
      	if(jsonResp?.feed?.entry){
      		const entrys: IStripeEntry[] = jsonResp.feed.entry;
      		const smallest: IStripeEntry = entrys.reduce((p, v) => {
				    return ( new Date(p.updated._text) < new Date(v.updated._text) ? p : v );
				  });
				  smallest.summary = smallest.summary._text;
				  smallest.updated = smallest.updated._text;
          return smallest;
      	}else{
          logger.error("Stripe Service: failed at %s",args);
          return;
      	}
      }
    );
  }
};