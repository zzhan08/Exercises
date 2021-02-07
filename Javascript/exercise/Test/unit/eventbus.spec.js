const eventsbus = require('../../source/eventsbus.js').eventsbus;

describe("test eventbus function", () => {
	let count = 0;

  beforeEach(function() {
    count = 0;
  });
  afterEach(function() {
    expect(count).toBe(3);
  });

	test('eventbus test', () => {
	  const tag = "location";
	  const message = "args";	
	  eventsbus.addHandler(tag, function(msg){
      expect(msg).toBe(message);
      count++;
	  });
	  eventsbus.addHandler(tag, function(msg){
      expect(msg).toBe(message);
      count++;
	  });
	  eventsbus.addHandler(tag, function(msg){
      expect(msg).toBe(message);
      count++;
	  });
	  eventsbus.emitEvent(tag, message)
	});


});