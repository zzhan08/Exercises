const validator = require('../../source/validator.js');
let _ = require('underscore');
describe("test fileloader function", () => {
  test('fileloader invalid path', () => {
    let result = validator.loadFile("esdfsf", "Test/TestJson");
    expect(result).toBe(undefined);
  });

  test('fileloader testJson path', () => {
    let result = validator.loadFile("testJson.json", "Test/TestJson");
    expect(result).toBe(undefined);
  });

  test('fileloader valid path', () => {
    let result = validator.loadFile("testJson1.json", "Test/TestJson");
    expect(!_.isUndefined(result) && !_.isEmpty(result)).toBe(true);
  });

  test('fileloader missing agents path', () => {
    let result = validator.loadFile("testJson2.json", "Test/TestJson");
    expect(result).toBe(undefined);
  });

  test('fileloader missing agents path', () => {
    let result = validator.loadFile("testJson3.json", "Test/TestJson");
    expect(result).toBe(undefined);
  });
});

describe("test Agents validation function", () => {
  test('Agents validation', () => {
    let ags = [];
    expect(validator.validateAgents(ags)).toBe(false);

    let ags1 = [{}];
    expect(validator.validateAgents(ags1)).toBe(false);

    let ags2 = [{name: "sad", type: "asdf", options:{}}];
    expect(validator.validateAgents(ags2)).toBe(false);

    let ags3 = [{name: "sad", type: "asdf", options:{"url":"xx"}}];
    expect(validator.validateAgents(ags3)).toBe(false);

    let ags4 = [{name: "sad", type: "HTTPRequestAgent", options:{"url":""}}];
    expect(validator.validateAgents(ags4)).toBe(false);

    let ags5 = [{name: "sad", type: "HTTPRequestAgent", options:{"url":"sdfsdf"}}];
    expect(validator.validateAgents(ags5)).toBe(true);

    let ags6 = [{name: "sad", type: "PrintAgent", options:{"message":""}}];
    expect(validator.validateAgents(ags6)).toBe(false);

    let ags7 = [{name: "sad", type: "PrintAgent", options:{"message":"sdfsdf"}}];
    expect(validator.validateAgents(ags7)).toBe(true);
  });

  
});
