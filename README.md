# STAKER PARADISE SMART CONTRACT SIDE / ADMIN DASHBOARD

 This is the blockchain side of the project staker paradise, and the admin dashboard.
 So if you don't see the repo of the FrontEnd part you will find it here :
 


# Task to run it on local hardhat node  / Testnet:

 1) npm install 
 2) replace the `examplehardhat.config.js` by `hardhat.config.js`
 3) run the command `npx hardhat run scripts/deploy --network localhost` PS : you should deploy
  the smart contracts one by one just by removing comments.
 4) the `StakerParadise`contract take the `SPT` contract address as parametre so don't forget it.
 5) Done ! now you deployed all the contracts to your local node
 
 # Aadmin Dashboard 
 
  The admin dashboard until now it's just a command line. In the `interacting.js` file you will find
  a lot of functions 
  
  1) `getFreeToken1` => give you 1000 tn1 to start staking
  2) `approve` => the admin run it before `createInvestmentPool` to allow the smart contract use tokens
  3) `createInvestmentPool` => take 6 para the tokenAddress,totalReward,deposit time , mini deposit,max supply, staking time.
  4) `getLiveIVP1` => return all an array of all the live IVPs
  5) `getEndIVP` => return all an array of all the end IVPs
  6) `approve_before_stake1` => before stake you need to approve.
  7) `stake` => the stake function take 2 para IVP id , amount to stake.
  8) `getUserInvestment` => return an array of IVPs which the user invested on it.
  
  
