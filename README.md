# option in decentralized finance

## 

We want options that has the following properties:
- trustless
- no counter-party risk

This will be implemented on Tendermint with Lotionjs framework.


see basic_callput_option.md about how the basic trustless options works.


## basic option fields

- type
(call/put/butterfly/strangle)
- strikePrice
- expirationHeight
- asset
- owner


## rest endpoints

http://localhost:5001/states

http://localhost:5001/createOption

http://localhost:5001/exerciseOption?id=1572800309481&user=alice

http://localhost:5001/sellOption?id=1572800309481&user=alice&salePrice=1337

http://localhost:5001/buyOption?id=1572800309481&user=bob
