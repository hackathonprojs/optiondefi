let { connect } = require('lotion')
let fs = require('fs');

let GCI;

fs.readFile("../gci.txt", "utf-8", (err, data) => {
  if (err) { console.log(err) }
  console.log('GCI from gci.txt: ' + data);
  GCI = data;

  (async function () {  

    let stateInfo = await readState();
    console.log(stateInfo);
  })();
})

async function readState() {
  let { state, send } = await connect(GCI)
  let stateInfo = await state;
  return stateInfo;
}