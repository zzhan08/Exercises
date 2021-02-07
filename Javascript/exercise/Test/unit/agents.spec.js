const agents = require('../../source/agents.js');
let _ = require('underscore');

describe("test agents function", () => {
	
  test('Agent http test', () => {
    agents["HTTPRequestAgent"]("http://free.ipwhois.io/json/", function(err, result){
    	expect(err).toBe(null);
    	expect(!_.isEmpty(result)).toBe(true);
    });
  });

  test('Agent http test', () => {
    agents["HTTPRequestAgent"]("https://coding-exercise.tines.io/webhook/160564ed1b5ea694ca19024c9a7d2889/54a35506d279294db2abac754d46685c?email=jane@example.com", function(err, result){
    	expect(err).toBe(null);
    	expect(!_.isEmpty(result)).toBe(true);
    });
  });
  test('Agent print test', () => {
    agents["PrintAgent"]("if print true", function(err, result){
    	expect(err).toBe(null);
    });
  });
});