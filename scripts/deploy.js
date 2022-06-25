const {ethers} = require ("hardhat");



async function deployFreeToken1() {
    const sptfactory = await ethers.getContractFactory("FreeToken1");
    const spt = await sptfactory.deploy();
    console.log("Deployed FreeToken1 contract to: ", spt.address);
    //0xbd581234CBa1d85FF6Cac3317eEbFa9a889ee0f4
}
async function deployFreeToken2() {
    const sptfactory = await ethers.getContractFactory("FreeToken2");
    const spt = await sptfactory.deploy();
    console.log("Deployed FreeToken2 contract to: ", spt.address);
    //0x120E02C2BFe7eE4F1eaf0274b653Ae05FC685600
}
async function deployFreeToken3() {
    const sptfactory = await ethers.getContractFactory("FreeToken3");
    const spt = await sptfactory.deploy();
    console.log("Deployed FreeToken3 contract to: ", spt.address);
    // 0xB7188Dd8Cfdf593BFbdB025fd6AC3036D43e6c20
}



async function deploySPT() {
    const sptfactory = await ethers.getContractFactory("SPT");
    const spt = await sptfactory.deploy();
    console.log("Deployed SPT contract to: ", spt.address);
    return spt.address
// 0x7fd745D5869Fc8c4afd50ffDe85dF8341337bfC5
}



async function deploy() {
    const stFactory = await ethers.getContractFactory("StakerParadise");
    const st = await stFactory.deploy("0x7fd745D5869Fc8c4afd50ffDe85dF8341337bfC5");
    console.log("deployed At " + st.address);
    return st
    //0x2aFA49A08AAC17992C6E0103bAA056D03d3eeD14
}



// deployFreeToken1()
// deploySPT()
// deploy()
// deployFreeToken2()
// deployFreeToken3()


module.exports={
    deploy
}

