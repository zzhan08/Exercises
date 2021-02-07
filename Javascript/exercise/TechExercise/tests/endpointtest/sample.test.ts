import app from "../../src/app";
import supertest from "supertest";
const request = supertest(app);
describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request.get("/");
    //expect(result.text).toEqual("Hello world!");
    expect(result.status).toEqual(404);
  });

  it("health check API Request", async () => {
    const result = await request.get("/health-check");
    expect(result.text).toEqual("OK");
    expect(result.status).toEqual(200);
  });

  it("Status API Get Request", async () => {
    const result = await request.get('/current/get');
    expect(result.status).toEqual(401);
  });
});
