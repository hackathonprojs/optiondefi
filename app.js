/**
 * option
 * 
- id
- type
(call/put/butterfly/strangle)
- strike
  - strike price
- expiration
  - the block height of expiration
- amount
  - the amount of asset in the contract.
- asset
- owner


basic operations
- create option
- lock the underlying asset (might be in the same step as create)
- exercise
- change owner
- buy/sell option
 */


let lotion = require('lotion')
let fs = require("fs");

let app = lotion({
	initialState: {
    options: {
      // repository of all the outstanding options

    },
    asset1Balance: {
      "alice": 10000,
      "bob": 10000,
      "carol": 10000,
    },
    asset2Balance: {
      "alice": 10000,
      "bob": 10000,
      "carol": 10000,
    },
    asset3Balance: {
      "alice": 10000,
      "bob": 10000,
      "carol": 10000,
    },
		count: 0,
	}
})

// function transactionHandler(state, transaction) {
//   state.count++;
// }

function createOptionHandler(state, transaction) {
  if (transaction.msgType === "create_option") {
    console.log("create option: ", transaction);
    let cloned = Object.assign({}, transaction);
    if (!cloned.id) {
      cloned.id = new Date().getTime();
    }
    state.options[cloned.id] = cloned;
  }
}



//app.use(transactionHandler);
app.use(createOptionHandler);

app.start().then(function(appInfo) {
	console.log(`app started. gci: ${appInfo.GCI}`)

	let data = appInfo.GCI;

  // write gci to gci.txt so that the client can pick it up.  for easier testing.
	fs.writeFile("gci.txt", data, (err) => {
		if (err) console.log(err);
		console.log("written gci to gci.txt");
	});
})



//-------------------------------




let optionTemplate = {
  id: undefined, // [integer] 
  type: undefined, // [string] "call", "put", "butterfly", "barrier"
  strike: undefined, // [number] strike price
  expiration: undefined, // [integer]  integer. the block height
  asset: undefined, // [string] the asset id of the underlying asset
  owner: undefined, // [string] address of the owner of this option
  heldAsset: undefined,
  owedAsset: undefined,
}

function simpleCreate(type, strike, expiration, asset, owner) {
  // todo: for hackathon, we use timestamp as id.  definitely not an accepetable id.  we'll change that to hash or guid.
  let option = Object.assign({}, optionTemplate);
  option.id = new Date().getTime();
  option.type = type;
  option.strike = strike;
  option.expiration = expiration;
  option.asset = asset;
  option.owner = owner;

  create(option);
}

function create(option) {
  // write to state.
  
}