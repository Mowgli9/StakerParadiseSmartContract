const { expect } = require("chai");
const { ethers } = require("hardhat");
const {deploy} = require("../scripts/deploy");

// describe("Create investmentPool", function () {
//   it("Should create investment pool", async function () {
//     const [owner,account1,account2,account3] = await ethers.getSigners()
//     const contract = await deploy()
//     const tokenContract = await ethers.getContractAt("SPT", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
//     const approve = await tokenContract.connect(owner).approve( contract.address,10000)
//     const create = await contract.connect(owner).createInvestmentPool(
//       "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
//       1000000,
//       1,
//       20,
//       10000,
//       3
//     )

//     const currentId = await contract.connect(owner).getCurrentId()
//     const getIVPdetails = await contract.connect(owner).getIVPdetails(1)
//     console.log("Detail : ",getIVPdetails);
//     expect(currentId).to.equal(2)

//   });
// });

describe("Stake", function () {


  // it("Should revert because the the user doen't have enough token", async function () {
  //   const [owner,account1,account2,account3] = await ethers.getSigners()
  //   const contract = await deploy()
  //   const tokenContract = await ethers.getContractAt("SPT", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
  //   const approve = await tokenContract.connect(owner).approve( contract.address,10000)
  //   const create = await contract.connect(owner).createInvestmentPool(
  //     "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  //     1000000,
  //     1,
  //     20,
  //     10000,
  //     3
  //   )
  //   await expect (contract.connect(account1).stake(1,1000)).to.be.revertedWith("not enough")
  // });
  // it("Should revert because the amount over than the max supply", async function () {
  //   const [owner,account1,account2,account3] = await ethers.getSigners()
  //   const contract = await deploy()
  //   const tokenContract = await ethers.getContractAt("SPT", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
  //   const approve = await tokenContract.connect(owner).approve( contract.address,10000)
  //   const create = await contract.connect(owner).createInvestmentPool(
  //     "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  //     1000000,
  //     1,
  //     20,
  //     10000,
  //     3
  //   )
  //   await expect (contract.connect(owner).stake(1,10000000000)).to.be.revertedWith("over amount")
  // })
  // it("Should revert because the deposit time end", async function () {
  //   const [owner,account1,account2,account3] = await ethers.getSigners()
  //   const contract = await deploy()
  //   const tokenContract = await ethers.getContractAt("SPT", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
  //   const approve = await tokenContract.connect(owner).approve( contract.address,10000)
  //   const create = await contract.connect(owner).createInvestmentPool(
  //     "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  //     1000000,
  //     1,
  //     20,
  //     10000,
  //     3
  //   )
  //   const approve_stake = await tokenContract.connect(owner).approve(contract.address,100)

  //   await network.provider.send("evm_increaseTime", [88000])

  //   await expect (contract.connect(owner).stake(1,100)).to.be.revertedWith("too late")
  // })

});



describe("Unstake", function () {


  it("Should revert cause of staking time", async function () {
    const [owner,account1,account2,account3] = await ethers.getSigners()
    const contract = await deploy()
    const tokenContract = await ethers.getContractAt("SPT", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
    const approve = await tokenContract.connect(owner).approve( contract.address,10000)
    const create = await contract.connect(owner).createInvestmentPool(
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      1000000,
      1,
      20,
      10000,
      3
    )
    const approve_stake = await tokenContract.connect(owner).approve(contract.address,100)

    // await network.provider.send("evm_increaseTime", [88000])
    const stake = await contract.connect(owner).stake(1,100)


    await expect (contract.connect(owner).unstake(1)).to.be.revertedWith("not yet")
  });
  
})