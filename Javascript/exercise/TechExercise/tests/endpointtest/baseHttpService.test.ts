
import IRequestOptions from '../../src/interface/iRequestJsOptions';
import basehttpService from '../../src/services/baseHttpService';

describe("base http service test", () => {
  test("url should be ok request", async () => {
  	let request = new basehttpService();
  	const option: IRequestOptions = {
	     url: "http://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=eff85cd169416f673bc94a8fb7bc68e2",
		};
    await expect(request.sendGetRequest(option)).resolves;
  });
  test("la long should be ok request", async () => {
  	let request = new basehttpService();
  	const option: IRequestOptions = {
	     url: "http://api.openweathermap.org/data/2.5/weather?lat=53.3302&lon=-6.3106&appid=eff85cd169416f673bc94a8fb7bc68e2",
		};
    await expect(request.sendGetRequest(option)).resolves;
  });

  test("stripe should be ok request", async () => {
    let request = new basehttpService();
    const option: IRequestOptions = {
       url: "https://status.stripe.com/current/atom.xml",
       json: true
    };

    await expect(request.sendGetRequest(option)).resolves;
  });
});
