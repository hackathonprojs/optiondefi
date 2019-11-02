let lotion = require('lotion')
let fs = require("fs");

let app = lotion({
	initialState: {
		count: 0
	}
})

function transactionHandler(state, transaction) {
	if (state.count === transaction.nonce) {
		state.count++
	}
}

app.use(transactionHandler)

app.start().then(function(appInfo) {
	console.log(`app started. gci: ${appInfo.GCI}`)

	let data = appInfo.GCI;

	fs.writeFile("gci.txt", data, (err) => {
		if (err) console.log(err);
		console.log("written gci to gci.txt");
	});
})

