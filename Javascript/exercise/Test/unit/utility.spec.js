const unitlity = require('../../source/utility.js');

describe("test replaceText function", () => {
  
	test('replaceText test', () => {
		let testCases = [
      ["{{result.field}}", {'result':{'field': 'replace1', 'field2':'replace2' }}, "replace1"],
      ["{{result.field2}}", {'result':{'field': 'replace1', 'field2':'replace2' }}, "replace2"],
      ["{{result.field.fieldIn}}", {'result':{'field': {"fieldIn":"replacex"}, 'field2':'replace2' }}, "replacex"],
      ["{{result.Field.fieldIn}}", {'result':{'field': {"fieldIn":"replacex"}, 'field2':'replace2' }}, ""],
      ["{{result.x.fieldIn}}", {'result':{'field': {"fieldIn":"replacex"}, 'field2':'replace2' }}, ""],
      ["ss", {'result':{'field': {"fieldIn":"replacex"}, 'field2':'replace2' }}, "ss"],
      ["{{}}", {'result':{'field': {"fieldIn":"replacex"}, 'field2':'replace2' }}, ""],
      ["{s}}", {'result':{'field': {"fieldIn":"replacex"}, 'field2':'replace2' }}, "{s}}"]

		]	
		for(let i = 0; i < testCases.length; i++){
	    expect(unitlity.replaceTextTest(testCases[i][0], testCases[i][1])).toBe(testCases[i][2]);
		}	  
	});


});

describe("test interpolation function", () => {
  
	test('interpolate test', () => {
		let testCases = [
      ["sdfsdfsdfsdf{{result.field}}sdfsdfsd{{result.field2}}", {'result':{'field': 'replace1', 'field2':'replace2' }}, "sdfsdfsdfsdfreplace1sdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{result.x}}sdfsdfsd{{result.field2}}", {'result':{'field': 'replace1', 'field2':'replace2' }}, "sdfsdfsdfsdfsdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{result.field.fieldin}}sdfsdfsd{{result.field2}}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdfreplacexsdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{result.field.fieldin}}sdfsdfsd{{result.field2}}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdf{result.field.fieldin}}sdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{result.field.fieldin}sdfsdfsd{{result.field2}}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdf{{result.field.fieldin}sdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{result.field.fieldin}}}sdfsdfsd{{result.field2}}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdfreplacex}sdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{{{result.field.fieldin}}}sdfsdfsd{{result.field2}}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdf{{replacex}sdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{{{result.fi{{}}eld.fieldin}}}sdfsdfsd{{result.field2}}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdf{{{{result.field.fieldin}}}sdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{{{res{ult.fi{{}}eld.fieldin}}}sdfsdfsd{{result.field2}}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdf{{{{res{ult.field.fieldin}}}sdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{{{res{ult.fi{eld.fieldin}}}sdfsdfsd{{result.field2}}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdf{{{{res{ult.fi{eld.fieldin}}}sdfsdfsdreplace2"],
      ["sdfsdfsdfsdf{{{{res{ult.fi{eld.fieldin}}}sdfsdfsd{{result.field2}", {'result':{'field': {'fieldin': 'replacex'}, 'field2':'replace2' }}, "sdfsdfsdfsdf{{{{res{ult.fi{eld.fieldin}}}sdfsdfsd{{result.field2}"]

		]

		for(let i = 0; i < testCases.length; i++){
	    expect(unitlity.interpolate(testCases[i][0], testCases[i][1])).toBe(testCases[i][2]);
		}

	});


});
