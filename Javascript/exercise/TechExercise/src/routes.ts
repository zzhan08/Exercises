
import {current} from './controllers/currentStatusController';
import {queryValidator} from './components/validate.component';
import BasicAuthStragety from './components/auth.component';

export const routes =  (server:any) => {
	const auth = new BasicAuthStragety(server);

  server.get('/current/get',
  	auth.authenticate(),
  	queryValidator("currentStatusSchema"),
    current.get
  );


};

