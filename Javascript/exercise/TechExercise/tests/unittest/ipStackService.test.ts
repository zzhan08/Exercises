

import IpStackService from '../../src/services/ipStackService';

describe("ip stack service test", () => {

  test("request should be ok request", async () => {
  	let request = new IpStackService();

    await expect(request.getDetail("37.228.234.179")).resolves;
  });
});
