🙃🙃🙃🙃 Disclamer : I don't suggest you to use this smart contract, It was only for me to learn more about Solidity ` Who the f* wrote this smart contract 😆😆😆😆 `





# STAKER PARADISE SMART CONTRACT SIDE / ADMIN DASHBOARD

 This is the blockchain side of the project staker paradise, and the admin dashboard.
 
 ! important : all the information about the project you find it on the repo bellow : 
 
 The frontend repo : 
 
 
 


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
  
  
