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
  console.log(stateInfo);
  return stateInfo;
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
//expressapp.get('/', (req, res) => res.send('Hello World!'))

expressapp.listen(port, () => console.log(`Example app listening on port ${port}!`))