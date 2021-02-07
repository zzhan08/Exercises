let filterByTerm = require("../fByTerms");
describe("Filter function", () => {
  // test stuff
  test("test one thing", ()=>{
  	const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];
    const output = [{ id: 3, url: "https://www.link3.dev" }];
    expect(filterByTerm(input, "link")).toEqual(output);
  expect(filterByTerm(input, "LINK")).toEqual(output);
  });
});