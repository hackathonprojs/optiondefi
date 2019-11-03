let { connect } = require('lotion')
let fs = require('fs');

let GCI;

fs.readFile("../gci.txt", "utf-8", (err, data) => {
  if (err) { console.log(err) }
  console.log('GCI from gci.txt: ' + data);
  GCI = data;

  (async function () {  

    let option = {
      "strike": 12,
      "expiration": 200000,
      "owner": "alice",
      "optionType": "put",
    }
    createOption(option);
  })();
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
  console.log('createOption response: ', resp);

}


// async function writeState(newdata) {
//   let { state, send } = await connect(GCI)

//   console.log(await send(newdata))

//   let stateInfo = await state;
//   console.log(stateInfo);
//   return stateInfo;
// }