import MsgComponent from './msg.component';
import Ajv from 'ajv';
import isIp from 'is-ip';
import {logger} from '../logger';
const ajv = new Ajv({allErrors: true});
const ajvCoerce = new Ajv({allErrors: true, coerceTypes: true, useDefaults: true, verbose: true});
const resp:MsgComponent = new MsgComponent("validation");
ajvCoerce.addFormat('ip-format', {
    type: 'string',
    validate: (ip:string) => {
    	return isIp(ip);
    }
});
export const queryValidator = (schema:string)=>{
  const querySchema = require('../schemes/' + schema);
  /**
   * @name queryValidatorFunction
   * @function
   * @param {object} request the request function
   * @param {object} response the response function
   * @param {function} next the next function
   * @return {undefined}
   */
  return (request:any, response:any, next:any) => {
    const requestQuery = request.query;
    const requestID = request.id;
    logger.debug('Validator: Validator query for request ID: %s', requestID,
      {'incoming_query': requestQuery},
      {'query_schema': JSON.stringify(querySchema)}
    );
    const valid = ajvCoerce.validate(querySchema, request.query);
    if (!valid) {
      logger.error('Validator: Query is invalid for request ID: %s',
        requestID);
      resp.send(response, 400);
    } else {
      logger.info('Validator: Query input is valid for request ID: %s',
        requestID);
      next();
    }
  };
};
  /**
   * check if ip at private network
   * @param {string} ip
   * @return {boolean} true is at private network
   */

export const privateIp = (clientIp:string) => {
	if(clientIp === "0.0.0.0" || clientIp === "127.0.0.1" || clientIp === "::ffff:127.0.0.1" || clientIp === "::1"){
    return true;
	}
	const parts:string[] = clientIp.split(".");
  return parts[0] === '10' ||
	  (parts[0] === '172' && (parseInt(parts[1], 10) >= 16 && parseInt(parts[1], 10) <= 31)) ||
	  (parts[0] === '192' && parts[1] === '168');;
}