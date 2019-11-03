let { connect } = require('lotion')
let fs = require('fs');

let GCI


// async function writeState(newdata) {
//   let { state, send } = await connect(GCI)

//   console.log(await send(newdata))

//   let stateInfo = await state;
//   console.log(stateInfo);
//   return stateInfo;
// }

fs.readFile("gci.txt", "utf-8", (err, data) => {
  if (err) { console.log(err) }
  console.log('GCI from gci.txt: ' + data);
  GCI = data;
  // this is async
})

async function readState() {
  let { state, send } = await connect(GCI)
  let stateInfo = await state;
  return stateInfo;
}

async function createOption(option) {
  let { state, send } = await connect(GCI)
  option.msgType = "create_option";
  let resp = await send(option);
  console.log('create_option response: ', resp);

  return resp;
}

async function exerciseOption(id, user) {
  let { state, send } = await connect(GCI)
  
  let msg = {};
  msg.msgType = "exercise_option";
  msg.id = id;
  msg.user = user;
  let resp = await send(msg);
  console.log('exercise_option response: ', resp);

  return resp;
}

async function sellOption(id, user, salePrice) {
  let { state, send } = await connect(GCI)
  
  let msg = {};
  msg.msgType = "sell_option";
  msg.id = id;
  msg.user = user;
  msg.salePrice = salePrice;
  let resp = await send(msg);
  console.log('sell_option response: ', resp);

  return resp;
}

async function buyOption(id, user) {
  let { state, send } = await connect(GCI)
  
  let msg = {};
  msg.msgType = "buy_option";
  msg.id = id;
  msg.user = user;
  let resp = await send(msg);
  console.log('buy_option response: ', resp);

  return resp;
}

const express = require('express')
var cors = require('cors')
const expressapp = express()
const port = 5001

expressapp.use(cors())

expressapp.get('/states', (req, res) => {
  console.log("states");

  (async function () {
    let stateInfo = await readState();
	  res.send(stateInfo);
  })();
	
})

expressapp.get('/options', (req, res) => {
  console.log("states");

  (async function () {
    let stateInfo = await readState();
    let optionsObj = stateInfo.options;
    let optionsAr = [];
    for (let prop in optionsObj) {
      let option = optionsObj[prop];
      optionsAr.push(option);
    }

    res.send(optionsAr);
  })();
	
})

expressapp.get('/createOption', (req, res) => {
  console.log("createOption");
  let option = {
    "strike": 12,
    "expiration": 200000,
    "owner": "alice",
    "optionType": "put",
    "exercised": false,
    "salePrice": -1,
    "style": "european",
    "asset": "ETH", // [string] the asset id of the underlying asset
    "heldAsset": "ETH",
    "owedAsset": "ATOM",
  };


  (async function () {
    let lotionResp = await createOption(option);
	  res.send(lotionResp);
  })();
	
})

expressapp.get('/exerciseOption', (req, res) => {
  let id = req.query.id;
  let user = req.query.user;

  (async function() {
    let lotionResp = await exerciseOption(id, user);
    res.send(lotionResp);
  })();

})

expressapp.get('/sellOption', (req, res) => {
  let id = req.query.id;
  let user = req.query.user;
  let salePrice = req.query.salePrice;

  (async function() {
    let lotionResp = await sellOption(id, user, salePrice);
    res.send(lotionResp);
  })();

})

expressapp.get('/buyOption', (req, res) => {
  let id = req.query.id;
  let user = req.query.user;

  (async function() {
    let lotionResp = await buyOption(id, user);
    res.send(lotionResp);
  })();

})


expressapp.listen(port, () => console.log(`Example app listening on port ${port}!`))