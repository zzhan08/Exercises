
import request from "request-promise-native";
import IRequestOptions from "../interface/iRequestJsOptions";
import convert = require('xml-js');

export default class BasehttpService{
  sendPostRequest = (args:any) => {
    // TODO
  };
  /**
   * set get HTTP request
   * @param {object} query parameters object
   * @return {object} promise object
   */
  sendGetRequest = (args:IRequestOptions) => {
  	return new Promise<any>((resolve, reject) => {
  		args.method = "GET";
	    request(args, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let resp:any = body;
          if(args?.headers?.Accept === "application/json"){
            resp = JSON.parse(resp);
          }else if(args?.headers?.Accept === "application/xml"){
            resp = JSON.parse(convert.xml2json(resp, {compact: true, spaces: 4}));
          }
          resolve(resp);
        } else{
          reject(error ? error : response);
        }
      });
  	});
  };
};