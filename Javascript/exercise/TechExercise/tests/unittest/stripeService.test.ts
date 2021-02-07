
import stripeService from '../../src/services/stripeService';

describe("stripe service test", () => {

  test("request should be ok request", async () => {
  	let request = new stripeService();

    await expect(request.getStripStatus()).resolves;
  });
});
