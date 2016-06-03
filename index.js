var jade = require('jade');
var acornGlobals = require('acorn-globals');

var globals = ['jade', 'jade_mixins', 'jade_interp', 'jade_debug', 'buf'];

// from jade sources
function parse(str){ 
	var options = {};

	// Parse
	var parser = new jade.Parser(str, options.filename, options);
	var tokens;
	tokens = parser.parse();

	// Compile
	var compiler = new jade.Compiler(tokens, options);
	var js;
	js = compiler.compile();

	return js;
};

module.exports = function(jadeCode){
	var template = 'function tempName(){' + parse(jadeCode) + '}';
	var locals = acornGlobals(template)
		.map(function(i){
			return i.name;
		})
		.filter(function(i){
			return !~globals.indexOf(i);
		});
	return locals;
};