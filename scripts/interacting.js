const { ethers } = require("hardhat");
const {
  abi,
} = require("../artifacts/contracts/StakerParadise.sol/StakerParadise.json");
const sptabi = require("../artifacts/contracts/SPT.sol/SPT.json").abi;
const freeToken2Abi =
  require("../artifacts/contracts/FreeToken2.sol/FreeToken2.json").abi;
const freeToken3Abi =
  require("../artifacts/contracts/FreeToken3.sol/FreeToken3.json").abi;
const freeToken1Abi =
  require("../artifacts/contracts/FreeToken1.sol/FreeToken1.json").abi;

const FreeToken1 = "0xbd581234CBa1d85FF6Cac3317eEbFa9a889ee0f4";
const FreeToken3 = "0x120E02C2BFe7eE4F1eaf0274b653Ae05FC685600";
const FreeToken2 = "0xB7188Dd8Cfdf593BFbdB025fd6AC3036D43e6c20";

const contract_address = "0x2aFA49A08AAC17992C6E0103bAA056D03d3eeD14";
const contract_address_spt = "0x7fd745D5869Fc8c4afd50ffDe85dF8341337bfC5";

const contract = new ethers.Contract(contract_address, abi);
const tokenContract = new ethers.Contract(contract_address_spt, sptabi);
const freeToken_contract = new ethers.Contract(FreeToken1, freeToken1Abi);
const freeToken_contract2 = new ethers.Contract(FreeToken2, freeToken2Abi);
const freeToken_contract3 = new ethers.Contract(FreeToken3, freeToken3Abi);




////                ADMIN DASHBORD

// get free 1000 token
const getFreeToken1 = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const mint = await freeToken_contract.connect(account1).getFree(1000);
  console.log("DONE");
};
const getFreeToken2 = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const mint = await freeToken_contract2.connect(account1).mint(10000);
};
const getFreeToken3 = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const mint = await freeToken_contract3.connect(account1).mint(10000);
};

// approve spt token reward 
const approve = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const approve = await tokenContract
  .connect(owner)
  .approve(contract.address, ethers.utils.parseEther("1000000"));
  console.log("approved")
}
// create ivp 

const createInvestmentPool = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const create = await contract
    .connect(owner)
    .createInvestmentPool(FreeToken1, 10000,1, 100, 10000, 1);

  console.log("created");
};
// get all Live IVP

const getLiveIVP = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const getAll = await contract.connect(owner).getLiveIVP();
  console.log(getAll);
};


// get all End IVP
const getEndIVP = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const getAll = await contract.connect(owner).getEndIVP();
  console.log(getAll);
};

// approve before stake

const approve_before_stake = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const approve = await freeToken_contract.connect(account1).approve(
    contract.address,
    ethers.utils.parseEther("1000000")
  );
}

// stake 
const stake = async () => {
    const [owner, account1, account2, account3] = await ethers.getSigners();
  
  const stake = await contract.connect(account1).stake(1,100);
    console.log("staked");
};

// get all user investments

const getUserInvestment = async () => {
    const [owner, account1, account2, account3] = await ethers.getSigners();
    const getAll = await contract.connect(owner).getUserInvestment(account1.address);
    console.log(getAll);
}

const smratContractSPTBalance = async () => {
  const [owner, account1, account2, account3] = await ethers.getSigners();
  const balance = await tokenContract.connect(owner).balanceOf(contract_address)
  console.log("balance = ",balance)
}

// `````````````````````````````Commands````````````````````````````````
// createInvestmentPool()
// getFreeToken1()
// getLiveIVP();
// stake();
// getUserInvestment()
// getEndIVP()
// smratContractSPTBalance()