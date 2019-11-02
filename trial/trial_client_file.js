let { connect } = require('lotion')
let fs = require('fs');

let GCI;

fs.readFile("gci.txt", "utf-8", (err, data) => {
  if (err) { console.log(err) }
  console.log('GCI from gci.txt: ' + data);
  GCI = data;

  (async function () {  
    let stateInfo = await readState();
  })();
})

//let GCI = 'a4dfcaffc90a1b21e351bcf6e9f03035d1fc61299dd87d4ad009dd23ffd991db'


async function readState() {
  let { state, send } = await connect(GCI)
  let stateInfo = await state;
  console.log(stateInfo);
  return stateInfo;
}

