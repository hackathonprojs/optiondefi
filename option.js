/**
 * option
 * 
- id
- type
(call/put/butterfly/strangle)
- strike
  - strike price
- expirationHeight
- asset
- owner


basic operations
- create option
- lock the underlying asset (might be in the same step as create)
- exercise
- change owner
- buy/sell option
 */

 let optionTemplate = {
   id: undefined, // [integer] 
   type: undefined, // [string] "call", "put", "butterfly", "barrier"
   strike: undefined, // [number] strike price
   expiration: undefined, // [integer]  integer. the block height
   asset: undefined, // [string] the asset id of the underlying asset
   owner: undefined, // [string] address of the owner of this option
 }

function create() {
  // todo: for hackathon, we use timestamp as id.  definitely not an accepetable id.  we'll change that to hash or guid.

  
}

 

