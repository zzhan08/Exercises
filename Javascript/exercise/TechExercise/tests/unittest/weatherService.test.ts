
import ILocation from '../../src/interface/iLocation';
import weatherService from '../../src/services/weatherService';

describe("weather service test", () => {

  test("request should be ok request", async () => {
  	let request = new weatherService();
  	let location:ILocation = {
      lat:53.3302,
      lon:-6.3106
    };
    await expect(request.getWeather(location)).resolves;
  });
});
