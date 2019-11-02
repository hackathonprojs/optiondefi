let { connect } = require('lotion')

let GCI = 'a49f67fb90ddc8c1dc4116abb443ccc6ab6511e7a097a8f97af6da68dc11fa68'


// async function writeState(newdata) {
//   let { state, send } = await connect(GCI)

//   console.log(await send(newdata))

//   let stateInfo = await state;
//   console.log(stateInfo);
//   return stateInfo;
// }

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

  (async function () {
    let stateInfo = await readState();
	  res.send(stateInfo);
  })();
	
})
//expressapp.get('/', (req, res) => res.send('Hello World!'))

expressapp.listen(port, () => console.log(`Example app listening on port ${port}!`))