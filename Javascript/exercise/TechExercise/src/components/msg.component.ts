
const respMsg:any = {
  currentStatus:{
 	  200: "success",
    503: "Service Unavailable",
    500: "Internal Server Error",
    400: "Private Ip Not Allowd",
    402: "Payment Required, for region outside EU"
  },
  validation:{
    400: "invalid requests"
  }
}

export default class MsgComponent{
  private resp: any;
  constructor(controller:string){
     this.resp = respMsg[controller];
  }
  /**
   * return response message
   * @param {object} response obj
   * @param {number} http status code
   * @param {data} customized message
   * @return {object} return response message
   */
  send = (response:any,code: number, data?:any) => {
  	const msg:any = {
  		message: this.resp[code],
  	}

    return response.status(code).send(data ? data : msg);
  }
}
