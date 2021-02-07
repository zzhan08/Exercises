import passport from "passport";
import passportHttp from 'passport-http';
const BasicStrategy = passportHttp.BasicStrategy;
class BasicAuthStragety{
	constructor(app:any){
		passport.use(new BasicStrategy(
		  (username:string, password:string, done:any) => {
		      if(username === "admin" && password === "admin"){
						return done(null, {
			         user: "admin"
			      });
		      }
		      return done(null,false);
		   }
		));
		passport.serializeUser((user, done) => {
		  done(null, user);
		});

		passport.deserializeUser((user, done) => {
		  done(null, user);
		});
    app.use(passport.initialize());
	}
	authenticate = () => {
    return passport.authenticate('basic', {
		  session: true
		})
	}
}

export default BasicAuthStragety;
