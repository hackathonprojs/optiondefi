let { connect } = require('lotion')

let GCI = 'a4dfcaffc90a1b21e351bcf6e9f03035d1fc61299dd87d4ad009dd23ffd991db'


async function writeState(newdata) {
  //let { state, send } = await connect(GCI)
  // doing operation here works as well.
}

(async function () {  
  // weird.  cannot connect here unless there is a async function before this statement.  very weird.
  let { state, send } = await connect(GCI)
  let stateInfo = await state;
  console.log(stateInfo);

})();
