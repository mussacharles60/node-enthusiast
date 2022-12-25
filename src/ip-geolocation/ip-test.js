
const {IP2Location, IPTools} = require("ip2location-nodejs");

// const tools = new IPTools();
// const ip = tools.decimalToIPV4(34732544);
// console.log(ip);

let ip2location = new IP2Location();

ip2location.open("./bin/DB11.BIN");

testip = ['1.0.0.0'];

for (var x = 0; x < testip.length; x++) {
	result = ip2location.getAll(testip[x]);
	for (var key in result) {
		console.log(key + ": " + result[key]);
	}
	console.log("--------------------------------------------------------------");
}

ip2location.close();


