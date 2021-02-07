
import MyIpService from '../../src/services/myIpService';

describe("my ip service test", () => {

  test("request should be ok request", async () => {
  	let request = new MyIpService();

    await expect(request.get()).resolves;
  });
});
